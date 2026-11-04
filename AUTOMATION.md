# Automation Scripts

This directory contains automation scripts to make content management easier.

## 🚀 All-in-One Site Manager (Recommended)

### **The Complete Solution**
- **Bash version**: `./site-manager.sh`
- **Fish version**: `./site-manager.fish`

A comprehensive interactive menu system for managing all aspects of your website.

**Usage:**
```bash
./site-manager.sh  # or ./site-manager.fish
```

**Features:**
- [1] 📝 Create Blog Post
- [2] 📚 Add Resource
- [3] 📅 Add Calendar Event
- [4] 🎤 Add Conference
- [5] 📸 Add Gallery Album
- [6] 💼 Add Career Entry
- [7] 🎓 Add Certification/Course
- [8] 🔍 Preview Site (Jekyll Serve)
- [9] 📤 Commit & Push Changes
- [0] ❌ Exit

**Why use this:**
- Interactive menu - no need to remember commands
- Handles all content types in one place
- Built-in preview and git workflow
- Consistent formatting across all additions
- Works in both bash and fish shells

### Calendar Event Quick Flow (Option 3)

The calendar event flow now supports faster and UI-friendly input:
- Defaults start date to today
- Auto-fills end date when omitted
- Supports `type` and `status` used by the calendar UI filters
- Optional `blog_post` and `gallery` links for event cards
- Runs `scripts/validate_data.rb` automatically after insert

Recommended values:
- Type: `conference`, `training`, `workshop`, `meetup`, `ctf`, `other`
- Status: `planned`, `confirmed`, `attending`, `completed`, `cancelled`

---

## Individual Scripts

### Gallery Import
- **Bash version**: `./add_gallery.sh`

Imports images from a local folder, creates a gallery directory, and appends a correctly formatted entry to `_data/gallery.yml`.

**Usage:**
```bash
./add_gallery.sh /path/to/photos
```

---

## Examples

### Using Site Manager
```bash
./site-manager.sh

# Select option 1 for blog post
Post title: Building Custom C2 Infrastructure
Post slug: custom-c2-infrastructure
Category: red-team
Tags: c2,infrastructure,sliver
Description: A guide to building scalable C2 infrastructure

# Then select option 8 to preview
# Finally select option 9 to commit and push
```

### Adding Multiple Items
```bash
./site-manager.sh

# Add a resource (option 2)
Resource title: Sliver C2 Framework
URL: https://github.com/BishopFox/sliver
...

# Add a conference (option 4)
Conference name: DEF CON 34
Year: 2026
...

# Preview changes (option 8)
# Commit everything (option 9)
```

---

## Tips

1. **Use site-manager**: The all-in-one script is easier and more consistent
2. **Test locally first**: Always preview (option 8) before pushing
3. **Descriptive content**: Use clear titles and descriptions
4. **Consistent naming**: Stick to established categories and tag conventions
5. **Regular commits**: Commit after each major addition (option 9)

## Workflow Example

**Recommended workflow for adding content:**

1. Run `./site-manager.sh`
2. Add your content (options 1-7)
3. Preview locally (option 8) - check everything looks good
4. Commit and push (option 9)
5. Done! 🎉

## Future Enhancements

Potential additions:
- Batch import from CSV/JSON files
- Automated image optimization for gallery
- Bulk photo upload with auto-naming
- Template customization options
- Analytics integration
- SEO metadata generator
