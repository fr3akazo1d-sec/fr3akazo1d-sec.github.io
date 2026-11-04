# Avatar Image Setup

## How to Add Your Avatar

1. **Place your avatar image** in this folder (`assets/images/`)
2. **Rename it to** `avatar.png` (or update the filename in `index.html`)
3. **Recommended specifications:**
   - Format: PNG, JPG, or WEBP
   - Size: 500x500 pixels or higher (square)
   - Transparent background (optional but looks better)

## Supported Formats

- `avatar.png` (recommended)
- `avatar.jpg`
- `avatar.webp`
- `avatar.gif` (for animated avatars)

## If Using a Different Filename

Edit the image source in `index.html`:

```html
<img src="{{ site.baseurl }}/assets/images/YOUR-FILENAME-HERE.png" alt="fr3akazo1d avatar" class="avatar-image">
```

## Current Setup

The avatar will display as a circle with:
- Cyan glowing border
- Hover effect (scales up and turns red)
- Floating animation
- Animated gradient border ring

If no image is found, you'll see a broken image icon - just add your avatar file here!
