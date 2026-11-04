# Assets Directory

This directory contains all media assets for the fr3akazo1d personal website.

## 📁 Structure

```
assets/
├── logo/           # Logo files (SVG, PNG)
├── avatar/         # Avatar and profile images
├── wallpapers/     # Background images and wallpapers
└── icons/          # Favicon and other icons
```

## 🖼️ Required Assets

### Logo (`logo/`)
- **logo.svg** - Main logo (F!) in SVG format (recommended)
- **logo.png** - PNG version for fallback
- **logo-icon.png** - Icon-only version (512x512px)

### Avatar (`avatar/`)
- **avatar.png** - Main avatar image (800x800px minimum)
- **avatar-hoodie.png** - Hoodie variant with F! emblem

### Icons (`icons/`)
- **favicon.ico** - Browser favicon (32x32px)
- **favicon-16x16.png** - Small favicon
- **favicon-32x32.png** - Standard favicon
- **apple-touch-icon.png** - Apple devices (180x180px)
- **android-chrome-192x192.png** - Android devices
- **android-chrome-512x512.png** - Android devices (high-res)

### Wallpapers (`wallpapers/`)
- **hero-bg.jpg** - Hero section background (optional)
- **og-image.png** - Open Graph image for social sharing (1200x630px)

## 🎨 Design Guidelines

### Logo Specifications
- **Format**: SVG (preferred) or PNG with transparency
- **Colors**: 
  - F: Neon cyan outline (#00fff7)
  - !: Solid neon red (#ff003c)
- **Style**: Cursive, sharp, hacker-style font
- **Effects**: Glitch effect compatible

### Avatar Specifications
- **Format**: PNG with transparency or JPG
- **Size**: 800x800px minimum (1:1 aspect ratio)
- **Style**: Back-view in hoodie
- **Details**: Small F! emblem on hoodie back
- **Background**: Dark or transparent

### Color Consistency
All assets should use the brand color palette:
- Background: #10141a, #141d2b
- Accent Cyan: #00fff7
- Accent Red: #ff003c
- Text: #c0c0c0

## 📝 Adding Assets

1. Place files in appropriate subdirectories
2. Use descriptive filenames (lowercase, hyphens)
3. Optimize images for web:
   - PNG: Use TinyPNG or similar
   - JPG: 80-85% quality
   - SVG: Minify with SVGO
4. Update HTML references:
   ```html
   <img src="assets/logo/logo.svg" alt="fr3akazo1d logo">
   ```

## 🔧 Image Optimization Tools

- **TinyPNG**: https://tinypng.com/ (PNG/JPG compression)
- **SVGOMG**: https://jakearchibald.github.io/svgomg/ (SVG optimization)
- **Squoosh**: https://squoosh.app/ (General image optimization)

## 📐 Recommended Sizes

| Asset Type | Size | Format |
|------------|------|--------|
| Logo | 512x512px | SVG, PNG |
| Avatar | 800x800px | PNG, JPG |
| Favicon | 32x32px | ICO, PNG |
| Apple Touch Icon | 180x180px | PNG |
| Android Chrome | 192x192px, 512x512px | PNG |
| OG Image | 1200x630px | PNG, JPG |

## 🚀 Quick Asset Setup

If you don't have custom assets yet, you can:

1. **Use placeholders**: The site works with CSS-only logo and avatar
2. **Create simple designs**: Use tools like Figma, Canva, or Adobe Express
3. **Commission designs**: Hire a designer on Fiverr or similar platforms
4. **Generate with AI**: Use Midjourney, DALL-E, or similar AI tools

## 📱 Testing Assets

After adding assets:
1. Test on different devices (desktop, tablet, mobile)
2. Check loading speed (aim for < 100KB per image)
3. Verify transparency works correctly
4. Test favicon in multiple browsers
5. Validate OG image with Facebook/Twitter debuggers

---

**Note**: This directory is tracked by Git. Large files should be optimized before committing.
