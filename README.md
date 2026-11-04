# fr3akazo1d - Personal Website

> **"Root is not a privilege. It's a mindset."**

A cybersecurity-themed personal website built with Jekyll, featuring a terminal aesthetic, interactive gallery system, event calendar, and hidden easter eggs.

[![Jekyll](https://img.shields.io/badge/Jekyll-4.x-red.svg)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Site](https://img.shields.io/badge/live-fr3akazo1d.github.io-00fff7.svg)](https://fr3akazo1d.github.io)

## 🎯 Features

### Core Features
- 🎨 **Terminal/Hacker Aesthetic** - Monospace fonts, cyan/green color scheme
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Static Site** - Fast Jekyll-powered generation
- 🎭 **Custom Cursor** - Interactive cursor with follower effect
- 🌙 **Dark Theme** - Easy on the eyes

### Interactive Components
- 📸 **Photo Gallery System** - Modal viewer with lightbox and navigation
- 📅 **Events Calendar** - Track conferences and events
- 📝 **Blog System** - Markdown-based posts with syntax highlighting
- 🏷️ **Tags System** - Organized content categorization
- 🎮 **Easter Eggs** - Hidden surprises for curious visitors

### Automation
- 🚀 **Gallery Script** - Automated photo gallery creation
- 🔄 **Auto-deployment** - GitHub Pages integration

## 🛠️ Tech Stack

- **Generator**: Jekyll 4.x
- **Templating**: Liquid
- **Styling**: Pure CSS3 with custom properties
- **Scripting**: Vanilla JavaScript (no frameworks)
- **Hosting**: GitHub Pages
- **CI/CD**: Automatic deployment on push

## 📁 Project Structure

```
personal-website/
├── _config.yml              # Jekyll configuration
├── _data/
│   ├── conferences.yml      # Conference attendance data
│   ├── gallery.yml          # Photo gallery configuration
│   └── calendar.yml         # Upcoming events calendar
├── _includes/               # Reusable HTML components
├── _layouts/
│   ├── default.html         # Base layout
│   └── post.html           # Blog post layout
├── _posts/                  # Blog posts (Markdown)
├── assets/
│   ├── images/
│   │   ├── gallery/        # Event photos
│   │   └── avatar.png      # Profile picture
│   └── pdf/                # Downloadable files
├── css/
│   ├── style.css           # Main stylesheet (~3000+ lines)
│   └── blog.css            # Blog-specific styles
├── js/
│   └── main.js             # Interactive features (~890 lines)
├── add_gallery.sh          # Gallery automation script
├── gallery.html            # Gallery page
├── conferences.html        # Conferences page
├── calendar.html           # Events calendar page
└── index.html              # Homepage
```

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7+
- Bundler
- Jekyll 4.x

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fr3akazo1d/fr3akazo1d.github.io.git
   cd fr3akazo1d.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run local development server**
   ```bash
   bundle exec jekyll serve --livereload --host 0.0.0.0
   ```

4. **Open in browser**
   ```
   http://localhost:4000
   ```

## 🧪 Local Testing (Desktop + Client Device)

### 1. Validate data before running

```bash
ruby scripts/validate_data.rb
```

### 2. Start local server (local machine only)

```bash
bundle exec jekyll serve --livereload
```

### 3. Start server for testing from your client device (same network)

```bash
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload
```

Or use the helper:

```bash
./scripts/run_local.sh 0.0.0.0 4000
```

Then open from your client device using your Mac IP:

```bash
ipconfig getifaddr en0
```

URL example on the client:

```
http://<your-mac-ip>:4000
```

### 4. If Bundler version is missing

If you see an error about Bundler version mismatch, install the required version from `Gemfile.lock`:

```bash
gem install bundler:2.7.2
bundle _2.7.2_ install
bundle _2.7.2_ exec jekyll serve --host 0.0.0.0 --port 4000 --livereload
```

## 📝 Configuration

### Site Settings

Edit `_config.yml` to customize:

```yaml
# Site Settings
title: fr3akazo1d
email: your-email@example.com
description: Your description here
motto: "Your custom motto"

# Author
author:
  name: Your Name
  email: your-email@example.com
  github: your-github
  twitter: your-twitter
  linkedin: your-linkedin
```

### Adding Content

#### Blog Posts

Create a new file in `_posts/`:

```markdown
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
categories: [category1, category2]
tags: [tag1, tag2]
---

Your content here...
```

#### Gallery

Use the automation script:

```bash
./add_gallery.sh
```

Or manually edit `_data/gallery.yml`:

```yaml
galleries:
  - name: "Event Name"
    slug: "event-slug"
    date: YYYY-MM-DD
    location: "City, Country"
    description: "Event description"
    cover_image: /assets/images/gallery/event-slug/cover.jpg
    visible: true
    photos:
      - image: /assets/images/gallery/event-slug/photo-001.jpg
        caption: "Photo caption"
        date: YYYY-MM-DD
```

#### Calendar Events

Edit `_data/calendar.yml`:

```yaml
events:
  - title: "Event Name"
    type: "conference"  # conference, training, workshop, meetup, ctf
    date_start: YYYY-MM-DD
    date_end: YYYY-MM-DD  # optional
    location: "City, Country"
    url: "https://event-website.com"
    status: "confirmed"  # planned, confirmed, attending, completed
    description: "Event description"
```

  Faster method (recommended):

  ```bash
  ./site-manager.sh
  # choose option 3: Add Calendar Event
  ```

  The workflow includes defaults, status/type support, optional blog/gallery links, and automatic data validation.

#### Conferences

Edit `_data/conferences.yml`:

```yaml
conferences:
  - name: "Conference Name"
    date: YYYY-MM-DD
    location: "City, Country"
    url: "https://conference.com"
    type: "Security Conference"
```

## 🎨 Customization

### Colors

Edit CSS custom properties in `css/style.css`:

```css
:root {
    --bg-main: #10141a;
    --bg-secondary: #1a1f2e;
    --accent-cyan: #00fff7;
    --accent-green: #39ff14;
    --accent-red: #ff073a;
    --text-bright: #e0e0e0;
    --text-dim: #8a8a8a;
}
```

### Typography

Change fonts in `_layouts/default.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 🎮 Easter Eggs

Try to find these hidden features:

1. **Konami Code** - Press: ↑ ↑ ↓ ↓ ← → ← → B A
2. **Type "root"** - Just type the word anywhere on the page
3. **Triple-click the logo** - Click the F! logo 3 times quickly
4. **Console messages** - Open browser console (F12) for hints

## 🛠️ Gallery Script Usage

The `add_gallery.sh` script automates gallery creation:

```bash
./add_gallery.sh
```

**Features:**
- Automatically numbers photos sequentially (photo-001, photo-002, etc.)
- Looks for dedicated `cover.jpg` in source folder
- If no cover found, uses first photo as cover
- Generates proper YAML formatting
- Supports .jpg, .jpeg, .png, .gif formats

**Workflow:**
1. Put all photos in a folder
2. Optionally add `cover.jpg` for custom cover image
3. Run the script
4. Follow interactive prompts
5. Photos are copied and YAML is updated automatically

## 📊 Performance

- **Build Time**: ~1.6 seconds
- **Total CSS**: ~3000+ lines
- **Total JavaScript**: ~890 lines
- **No external frameworks**: Pure vanilla JS
- **Optimized images**: Lazy loading enabled

## 🔒 Security Features

- HTTPS enforced (GitHub Pages)
- No external tracking
- No third-party analytics
- Secure external links (`rel="noopener"`)

## 🤝 Contributing

This is a personal website, but feel free to:
- Report bugs via Issues
- Suggest features
- Fork for your own use
- Submit improvements via Pull Requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Jekyll for the amazing static site generator
- GitHub Pages for free hosting
- The cybersecurity community for inspiration
- Open source contributors

## 📧 Contact

- **Website**: [fr3akazo1d.github.io](https://fr3akazo1d.github.io)
- **Email**: fr3akazo1d@malle.red
- **GitHub**: [@fr3akazo1d-sec](https://github.com/fr3akazo1d-sec)
- **Twitter**: [@fr3akazo1d](https://twitter.com/fr3akazo1d)

---

**Built with 💚 by fr3akazo1d**

*"Sometimes I feel like giving up, then I remember I have a lot of people to prove wrong."*
