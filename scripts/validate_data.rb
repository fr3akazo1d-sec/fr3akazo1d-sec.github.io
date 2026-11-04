#!/usr/bin/env ruby
# frozen_string_literal: true

require 'yaml'
require 'date'

ROOT = File.expand_path('..', __dir__)
DATA_DIR = File.join(ROOT, '_data')

def load_yaml(path)
  YAML.safe_load(File.read(path), permitted_classes: [Date], aliases: true) || {}
rescue Psych::SyntaxError => e
  abort("[ERROR] YAML parse failed for #{path}: #{e.message}")
end

def ensure_array(hash, key, file)
  value = hash[key]
  return value if value.is_a?(Array)

  abort("[ERROR] #{file}: expected '#{key}' to be an array")
end

def require_fields!(item, fields, file, idx)
  missing = fields.reject { |f| item.key?(f) && !item[f].to_s.strip.empty? }
  return if missing.empty?

  abort("[ERROR] #{file}: entry ##{idx} is missing required fields: #{missing.join(', ')}")
end

def validate_date(value, file, idx, field)
  Date.parse(value.to_s)
rescue ArgumentError
  abort("[ERROR] #{file}: entry ##{idx} has invalid date in '#{field}': #{value.inspect}")
end

def validate_calendar
  file = '_data/calendar.yml'
  data = load_yaml(File.join(DATA_DIR, 'calendar.yml'))
  events = ensure_array(data, 'events', file)

  events.each_with_index do |event, i|
    idx = i + 1
    require_fields!(event, %w[title type date_start location status description], file, idx)
    start_date = validate_date(event['date_start'], file, idx, 'date_start')
    end_date = event['date_end'] ? validate_date(event['date_end'], file, idx, 'date_end') : start_date
    if end_date < start_date
      abort("[ERROR] #{file}: entry ##{idx} has 'date_end' before 'date_start'")
    end

    valid_statuses = %w[planned confirmed attending completed cancelled]
    unless valid_statuses.include?(event['status'].to_s.downcase)
      abort("[ERROR] #{file}: entry ##{idx} has unsupported status: #{event['status'].inspect}")
    end
  end
end

def validate_gallery
  file = '_data/gallery.yml'
  data = load_yaml(File.join(DATA_DIR, 'gallery.yml'))
  galleries = ensure_array(data, 'galleries', file)

  galleries.each_with_index do |gallery, i|
    idx = i + 1
    require_fields!(gallery, %w[name slug date location description cover_image], file, idx)
    validate_date(gallery['date'], file, idx, 'date')
    photos = gallery['photos'] || []
    unless photos.is_a?(Array)
      abort("[ERROR] #{file}: gallery ##{idx} expected 'photos' array")
    end

    photos.each_with_index do |photo, j|
      photo_idx = j + 1
      require_fields!(photo, %w[image caption date], file, "#{idx}.#{photo_idx}")
      validate_date(photo['date'], file, "#{idx}.#{photo_idx}", 'date')
    end
  end
end

def validate_conferences
  file = '_data/conferences.yml'
  data = load_yaml(File.join(DATA_DIR, 'conferences.yml'))
  conferences = ensure_array(data, 'conferences', file)

  conferences.each_with_index do |conference, i|
    idx = i + 1
    require_fields!(conference, %w[name location date year type], file, idx)
    unless conference['activities'].nil? || conference['activities'].is_a?(Array)
      abort("[ERROR] #{file}: conference ##{idx} expected 'activities' array")
    end
    unless conference['highlights'].nil? || conference['highlights'].is_a?(Array) || conference['highlights'].to_s.empty?
      abort("[ERROR] #{file}: conference ##{idx} expected 'highlights' array or empty value")
    end
  end
end

def validate_resources
  file = '_data/resources.yml'
  data = load_yaml(File.join(DATA_DIR, 'resources.yml'))
  items = ensure_array(data, 'items', file)

  items.each_with_index do |item, i|
    idx = i + 1
    require_fields!(item, %w[title url description category date], file, idx)
    validate_date(item['date'], file, idx, 'date')
    unless item['tags'].nil? || item['tags'].is_a?(Array)
      abort("[ERROR] #{file}: resource ##{idx} expected 'tags' array")
    end
  end
end

def validate_files_present
  required = %w[calendar.yml gallery.yml conferences.yml resources.yml]
  required.each do |file|
    full = File.join(DATA_DIR, file)
    abort("[ERROR] Missing required data file: _data/#{file}") unless File.exist?(full)
  end
end

validate_files_present
validate_calendar
validate_gallery
validate_conferences
validate_resources

puts '[OK] Data validation passed.'