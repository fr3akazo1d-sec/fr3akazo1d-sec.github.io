---
layout: post
title: "Building My Hacker Portfolio: A Deep Technical Dive"
date: 2025-11-02
categories: [web-development, jekyll, portfolio]
tags: [jekyll, web-design, static-site, github-pages, javascript, css, canvas-api, intersection-observer, rss, security]
author: Fr3akaz01d
reading_time: "16 min read"
description: "A complete technical breakdown of how I built a cybersecurity-themed personal website from the ground up — Matrix rain, live RSS threat feed, visitor recon terminal, decrypt effects, a secret terminal, and a whole lot of vanilla JS."
---

# Building My Hacker Portfolio: A Deep Technical Dive

## Introduction

Most developer portfolios are a Next.js template with a pastel gradient and a "hire me" button. I wanted something different. As a red teamer, my site should feel like you accidentally landed on a C2 server — terminal prompts, hex rain, a scan of your own browser fingerprint, live threat intel. No React, no Vue, no framework bloat. Just Jekyll, vanilla JavaScript, and enough CSS to make a designer uncomfortable.

This post is a complete post-mortem of the build: every feature, the bugs it introduced, how I debugged them, and an honest section on what I still haven't shipped.

---

## Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Site generator | Jekyll 4.x | Static output, zero runtime, native GitHub Pages |
| Templating | Liquid | Ships with Jekyll, zero config |
| Scripting | Vanilla JS (ES2020) | No dependencies, smaller attack surface |
| Styling | CSS custom properties | No preprocessor needed, runtime theming |
| Hosting | GitHub Pages | Free TLS, automatic deploy on push |
| Fonts | Google Fonts (self-hosted subset) | JetBrains Mono, Orbitron, Share Tech Mono |

**Total external JS dependencies: zero.** Everything in `main.js` is hand-written. At 2,124 lines it is the single largest file on the site.

### Color system

Everything derives from five CSS custom properties defined in `:root`:

```css
:root {
    --bg-main:       #10141a;
    --bg-secondary:  #141d2b;
    --accent-cyan:   #00fff7;
    --accent-red:    #ff003c;
    --accent-green:  #39ff14;
    --font-mono:     'JetBrains Mono', 'Courier New', monospace;
}
```

The cyan + red pairing is lifted directly from classic terminal colour pairs. Deep navy background keeps perceived contrast high without the harshness of pure black.

---

## Project Structure

```
fr3akazo1d-sec.github.io/
├── _config.yml               # Jekyll site config + SEO plugin
├── _data/
│   ├── about.yml             # Bio / intro text
│   ├── calendar.yml          # CTF / conference calendar data
│   ├── conferences.yml       # Past events timeline
│   ├── gallery.yml           # Photo gallery metadata
│   ├── projects.yml          # Project cards
│   ├── resources.yml         # Curated links
│   └── skills.yml            # Skills matrix
├── _includes/
│   ├── blog-posts.html       # Blog post card partial
│   └── nav.html              # Fixed navigation bar
├── _layouts/
│   ├── default.html          # Base shell (head, cursor, HUD, CSP)
│   └── post.html             # Blog post layout (TOC sidebar + content grid)
├── _posts/                   # Markdown blog posts
├── assets/images/gallery/    # Event photography
├── css/
│   ├── style.css             # 4,885 lines — everything for the homepage
│   └── blog.css              # 681 lines — post layout + TOC sidebar
└── js/
    └── main.js               # 2,124 lines — all interactive features
```

Data-driven pages (conferences, resources, gallery) pull from YAML files in `_data/`. Adding a new conference is one line in `conferences.yml` — no HTML editing required.

---

## Feature Deep Dives

### 1. Matrix Rain Canvas

The hero section background runs a Canvas 2D hex rain effect. The key insight is the **fade trail**: instead of clearing the canvas each frame, a semi-transparent fill is drawn over the entire surface. Characters painted in earlier frames gradually dim rather than disappearing instantly.

```javascript
(function initMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas) return;

    const ctx       = canvas.getContext('2d');
    const CHARS     = '0123456789ABCDEF';   // hex charset — fits the theme
    const FONT_SIZE = 13;
    let cols, drops;

    function resize() {
        canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth;
        canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight;
        cols  = Math.floor(canvas.width / FONT_SIZE);
        drops = new Array(cols).fill(0).map(() => Math.random() * -50);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
        // 6% opacity fill = ~16-frame natural fade per character
        ctx.fillStyle = 'rgba(16, 20, 26, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < cols; i++) {
            const char = CHARS[Math.floor(Math.random() * CHARS.length)];
            const y    = drops[i] * FONT_SIZE;

            // 8% chance: bright white "lead" character at the head of each stream
            if (drops[i] > 0 && Math.random() > 0.92) {
                ctx.fillStyle = '#ffffff';
            } else {
                const alpha = 0.08 + Math.random() * 0.55;
                ctx.fillStyle = `rgba(0, 255, 247, ${alpha})`;
            }

            ctx.fillText(char, i * FONT_SIZE, y);

            // Reset column with 2.5% probability once it leaves canvas
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += 0.5;
        }
    }

    setInterval(draw, 55);   // ~18 fps — intentionally not 60fps, saves CPU
})();
```

**Bug I hit:** The canvas was `position: absolute` inside `<header>`, which also contained the `<nav>` (which is `position: fixed`). Setting `position: relative` on `header > *` to layer the matrix behind text accidentally overrode the nav's `position: fixed`, dropping it into normal document flow mid-page. The fix was narrowing the rule to only apply to `.header-container` rather than all direct header children.

---

### 2. Visitor Recon Scan Terminal

On first visit (gated by `sessionStorage`), a fullscreen overlay fires after the loading screen clears. It performs a real browser fingerprint collection and fetches the visitor's actual public IP from `ipapi.co` — then wraps everything in fake nmap/exploit output for atmosphere.

```javascript
(async function initVisitorScan() {
    const overlay = document.getElementById('visitorScan');
    if (!overlay) return;

    // Gate: homepage only, once per session
    const isHome = ['/', '/index.html', ''].includes(window.location.pathname);
    if (!isHome || sessionStorage.getItem('visitorScanShown')) return;
    sessionStorage.setItem('visitorScanShown', 'true');

    // Real browser fingerprint via navigator APIs
    const ua         = navigator.userAgent;
    const resolution = `${window.screen.width}x${window.screen.height}`;
    const lang       = navigator.language;
    const tz         = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cpu        = navigator.hardwareConcurrency;
    let   browser    = detectBrowser(ua);   // regex chain on UA string
    let   os         = detectOS(ua);

    // Real IP — 3 second timeout, silent fail
    let ip = '██.██.██.██', country = '';
    try {
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 3000);
        const data = await (await fetch('https://ipapi.co/json/', { signal: ctrl.signal })).json();
        ip      = data.ip;
        country = ` (${data.country_name})`;
    } catch (_) {}

    // Timed line-by-line reveal
    const lines = [
        { text: '[*] Initiating visitor reconnaissance...', delay: 0,    color: 'cyan'  },
        { text: `[+] IP Address    : ${ip}${country}`,     delay: 1500, color: 'green' },
        { text: `[+] OS            : ${os}`,               delay: 1900, color: 'green' },
        { text: `[+] Browser       : ${browser}`,          delay: 2200, color: 'green' },
        { text: `[+] Resolution    : ${resolution}`,       delay: 2500, color: 'green' },
        { text: `[+] Timezone      : ${tz}`,               delay: 3100, color: 'green' },
        { text: `[+] CPU Cores     : ${cpu}`,              delay: 3400, color: 'green' },
        { text: '[!] CVE-2024-1337  ........... PATCHED',  delay: 4200, color: 'red'   },
        { text: '// Just kidding — welcome, hacker. 😈',  delay: 5750, color: 'cyan'  },
        { text: '[+] ACCESS GRANTED',                      delay: 6100, color: 'green' },
    ];
```

Each line is `setTimeout`-delayed and appended as a `<div>` with a color class. `body.scrollTop = body.scrollHeight` after each append keeps the terminal scrolled to the latest line. The overlay auto-closes ~1.2 seconds after the last line fires.

**Privacy note:** The only external call is to `ipapi.co`. The browser fingerprint data (resolution, UA, timezone, CPU count) never leaves the browser — it's assembled client-side and displayed locally.

---

### 3. Live Security News Feed (Real RSS)

A fixed panel in the bottom-right corner pulls The Hacker News RSS feed via `rss2json.com`'s free JSON proxy, auto-refreshes every 10 minutes, and lets the user toggle it open/closed by clicking the panel header.

```javascript
const RSS_URL    = 'https://thehackernews.com/feeds/posts/default';
const API        = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
const REFRESH_MS = 10 * 60 * 1000;
```

**Why rss2json?** Direct `fetch()` of an RSS XML endpoint fails due to CORS headers on most news sites. `rss2json.com` proxies and converts to JSON, returning it with permissive CORS headers. The free tier doesn't support the `count` parameter — learned that the hard way (it silently returns zero articles if you include an unsupported param).

The `timeAgo()` helper converts ISO timestamps to human-readable relative time (`3m ago`, `2h ago`, `4d ago`) without importing a date library:

```javascript
function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}
```

The panel header is a full-width click target (`cursor: pointer`) that toggles `minimized` state. A `↺` button in the header triggers a manual refresh and rotates 360° via CSS `@keyframes` on a `.spinning` class that gets removed once the promise resolves.

**CSP implication:** The Content Security Policy in `default.html` explicitly whitelists `rss2json.com` and `ipapi.co` in `connect-src`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  connect-src 'self'
              https://api.rss2json.com
              https://ipapi.co
              https://api.github.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
">
```

Anything not on that list gets blocked by the browser before it even reaches the network.

---

### 4. Decrypt Effect on Section Titles

Every `.section-title` element gets a character-scramble animation when it scrolls into the viewport. The trick is `IntersectionObserver` rather than a scroll event listener — no polling, no `getBoundingClientRect()` on every scroll tick.

```javascript
(function initDecryptTitles() {
    const CHARSET   = '0123456789ABCDEF#@!%?<>/\\|~^$&*[]';
    const FRAME_MS  = 35;    // ~28 fps scramble
    const LOCK_RATE = 6;     // lock one character every 6 frames (left to right)

    function decrypt(el) {
        if (el.dataset.decrypted) return;   // idempotency guard
        el.dataset.decrypted = 'true';

        const original = el.textContent;
        const len      = original.length;
        let   locked   = 0;
        let   frame    = 0;

        el.classList.add('decrypting');     // suppresses glitch pseudo-elements

        const iv = setInterval(() => {
            let out = '';
            for (let i = 0; i < len; i++) {
                if (i < locked || original[i] === ' ') {
                    out += original[i];     // locked chars show the real text
                } else {
                    out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
                }
            }
            el.textContent = out;

            if (frame % LOCK_RATE === 0 && locked < len) locked++;
            frame++;

            if (locked >= len) {
                clearInterval(iv);
                el.textContent = original;
                el.classList.remove('decrypting');
            }
        }, FRAME_MS);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => decrypt(entry.target), 120);
                observer.unobserve(entry.target);   // fire once
            }
        });
    }, { threshold: 0.35 });

    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
})();
```

The `threshold: 0.35` means the animation starts when 35% of the element is visible — early enough to feel responsive, late enough that it doesn't fire before the user sees it.

**The `.decrypting` class** is important. The site uses `::before` and `::after` pseudo-elements for glitch effects on `.section-title`. While `textContent` is being replaced every 35ms, the glitch pseudo-elements (which clone the text via `content: attr(data-text)`) would flicker wildly. Suppressing them during the animation:

```css
.section-title.decrypting::before,
.section-title.decrypting::after {
    display: none !important;
}
```

---

### 5. Blog Post TOC — `ls -la` Style

The table of contents sidebar on blog posts is generated at runtime by querying `h2` and `h3` elements inside `.post-content`. It's styled as `ls -la` terminal output: directories (`h2`) get `drwxr-xr-x`, files (`h3`) get `-rw-r--r--`.

The header of the sidebar shows the actual post filename injected by Jekyll via a `data-slug` attribute:

```html
<!-- _layouts/post.html -->
<aside class="toc-sidebar" id="tocSidebar" data-slug="{{ page.slug }}.md">
    <div class="toc-header" id="tocHeader">
        <span class="toc-prompt">
            <span class="toc-p-user">root</span><span class="toc-p-at">@</span>
            <span class="toc-p-host">fr3akazo1d</span><span class="toc-p-suffix">:~#</span>
            <span class="toc-p-cmd">ls -la</span>
            <span class="toc-p-file" id="tocFilename"></span>
        </span>
        <button class="toc-collapse" id="tocCollapse">&minus;</button>
    </div>
    <nav class="toc-nav" id="tocNav" aria-label="Post sections"></nav>
</aside>
```

JS reads `tocSidebar.dataset.slug` and injects it into `#tocFilename`. The list is built programmatically:

```javascript
headings.forEach(h => {
    const isDir = h.tagName === 'H2';
    const li    = document.createElement('li');
    li.className = `toc-item toc-item--${h.tagName.toLowerCase()}`;

    const meta = document.createElement('span');
    meta.innerHTML = `
        <span class="ls-perm">${isDir ? 'drwxr-xr-x' : '-rw-r--r--'}</span>
        <span class="ls-owner">root</span> `;

    const link = document.createElement('a');
    link.className = `toc-link toc-${h.tagName.toLowerCase()}`;
    link.href      = '#' + h.id;
    link.textContent = isDir ? name + '/' : name;
```

Active section highlighting uses a second `IntersectionObserver` with `rootMargin: '-60px 0px -65% 0px'` — this creates a detection band in the upper third of the viewport, so the active link updates as you scroll rather than only snapping when a heading hits the very top.

The collapse/expand button toggles `.collapsed` on the sidebar, and CSS handles the animation:

```css
.toc-nav {
    max-height: 2000px;
    overflow: hidden;
    transition: max-height 0.35s ease;
}

.toc-sidebar.collapsed .toc-nav {
    max-height: 0;
}
```

Using `max-height` instead of `height` for the transition avoids needing to know the exact content height — a common trick since `height: auto` is not animatable.

---

### 6. Secret Terminal ( Ctrl+Shift+H )

Pressing `Ctrl+Shift+H` opens a draggable terminal overlay with a working command interpreter. Implemented commands include `help`, `whoami`, `ls`, `cat`, `nmap` (spoofed output), `clear`, and `exit`. The terminal tracks its own command history and cycles through it with `↑`/`↓` — same UX as bash.

---

### 7. Easter Eggs (Six Total)

All six are documented in the browser console on page load in a hidden message. In no particular order:

1. **Konami Code** (`↑↑↓↓←→←→BA`) — triggers a fullscreen "ACCESS GRANTED" animation
2. **Type `root`** — anywhere on the page (monitored via `keydown` buffer)
3. **Type `nmap`** — fires a fake nmap scan of the site
4. **Type `sudo`** — `sudo: permission denied.`
5. **Triple-click the logo** — unlocks something
6. **Ctrl+Shift+H** — secret terminal (documented above)

The keyboard sequence detection works by maintaining a rolling buffer of the last N keystrokes and checking it against target strings:

```javascript
let keyBuffer = '';
document.addEventListener('keydown', (e) => {
    keyBuffer = (keyBuffer + e.key).slice(-20);  // keep last 20 chars
    if (keyBuffer.includes('root'))   triggerRootEgg();
    if (keyBuffer.includes('nmap'))   triggerNmapEgg();
    if (keyBuffer.includes('sudo'))   triggerSudoEgg();
});
```

---

### 8. Security Hardening

Every page ships with HTTP-equivalent security headers via `<meta>` tags in `default.html`:

```html
<!-- Strict CSP -->
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    ...
">

<!-- Prevent MIME-type sniffing -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- Limit referrer data sent to third parties -->
<meta name="referrer" content="strict-origin-when-cross-origin">
```

A script in `main.js` also sweeps all external links at load time and enforces `rel="noopener noreferrer"`:

```javascript
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.rel = 'noopener noreferrer';
    }
});
```

This prevents the classic `window.opener` attack where a newly opened tab can navigate the parent tab.

---

### 9. Loading Screen & Boot Sequence

First visit to the homepage shows a fake boot sequence with rotating status messages drawn from an array (`'Bypassing firewall...'`, `'Downloading more RAM...'`, `'Hacking the mainframe...'`). `sessionStorage.setItem('hasVisitedHome', 'true')` gates it to one display per session. After the loading screen exits, the visitor recon scan fires — giving the sequence: boot → scan → site.

---

### 10. HUD & CRT Overlay

The `#hud` widget (`SYS`, `UPT`, `CONN ENCRYPTED`) lives in the bottom-left corner of every page. The system time updates via `setInterval` and the uptime counter increments from when `DOMContentLoaded` fired. Neither communicates with any external service — pure client-side.

The CRT scanline effect is a `::before` pseudo-element on `.crt-overlay`:

```css
.crt-overlay::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
    );
    pointer-events: none;
    z-index: 9998;
}
```

The 4px repeating gradient makes every other line marginally darker, replicating the phosphor scanlines of a CRT monitor. At `0.03` opacity it's subliminal — you feel it more than you see it.

---

## Lessons Learned

### 1. CSS Specificity is a Trap

The `header > *:not(.matrix-rain-canvas) { position: relative; }` rule — intended to stack the header content above the canvas — silently broke `position: fixed` on the nav and hack button, because `relative` inside a stacking context overrides `fixed`. Narrowing it to a `.header-container` class fixed it. **Always scope CSS rules to the minimum selector that works.**

### 2. CSS Transitions Need Explicit Starting Values

`max-height` collapse animations require a numeric starting value. You cannot transition `max-height` from `auto` to `0` — the browser has no idea what to interpolate from. Setting an explicit `max-height: 2000px` on the open state gives the browser something to work with.

### 3. External APIs Require CSP Pre-Planning

Adding `ipapi.co` and `rss2json.com` calls *after* writing the CSP required opening the console, reading the blocked-resource errors, then updating `connect-src`. Build the CSP first, then write the fetch calls.

### 4. `IntersectionObserver` Over Scroll Listeners

Both the decrypt effect and TOC active highlighting use `IntersectionObserver`. The old approach — `window.addEventListener('scroll', ...)` with `getBoundingClientRect()` — runs on the main thread every scroll frame and thrashes layout. `IntersectionObserver` runs off the main thread and fires only on state change. No measurable scroll jank.

### 5. `sessionStorage` For One-Shot UX

Both the loading screen and visitor scan need to show once and never again. `sessionStorage` (not `localStorage`) is the right tool: it clears when the tab closes, so opening a fresh session always shows the full boot experience.

---

## What's Not Shipped Yet

These are features I designed, partially implemented, or still have outstanding issues with:

| Feature | Status | Notes |
|---|---|---|
| Full-text blog search | Not started | Would need a client-side JSON index (lunr.js or pagefind) |
| Progressive Web App (offline mode) | Not started | Needs a service worker + cache manifest |
| Comments system | Not started | Considering utterances (GitHub Issues-backed) |
| Gallery photo EXIF display | Not started | Would require server-side EXIF extraction or a client lib |
| Reading time estimation | Not started | Easy to add in Jekyll via Liquid word count |
| Thumbnail generation in `add_gallery.sh` | Not started | ImageMagick `mogrify` could generate `thumb-*.jpg` variants |
| Light/Dark theme toggle | Skipped | Site is intentionally dark-only — a light mode would break the aesthetic |
| Analytics | Deliberately skipped | Would conflict with the CSP and my personal values |

The search feature is the most valuable missing piece. Right now the only way to find a specific post is to scroll the archive page. A pre-built JSON index at `search.json` (generated by Jekyll) combined with a client-side fuzzy matcher would solve this without any backend.

---

## Build Stats

| Metric | Value |
|---|---|
| `main.js` | 2,124 lines |
| `style.css` | 4,885 lines |
| `blog.css` | 681 lines |
| Jekyll build time | ~1.6 seconds |
| External JS libraries | 0 |
| External CSS libraries | 0 |
| Easter eggs | 6 |
| `fetch()` calls to external APIs | 2 (`ipapi.co`, `rss2json.com`) |

---

## Deployment

```bash
# Local dev with live reload
bundle exec jekyll serve --livereload --host 0.0.0.0

# Production — just push
git add -A && git commit -m "feat: ..." && git push origin main
```

GitHub Pages picks up the `main` branch automatically. Build time on their runners is under 30 seconds. Custom domain support is one `CNAME` file.

---

## Conclusion

The constraint of "no frameworks, no libraries, no build tools beyond Jekyll" forced a level of first-principles thinking that I don't get when scaffolding React projects. Every animation is a `requestAnimationFrame` loop or a CSS transition I had to reason about. Every API call has to fit within a manually maintained Content Security Policy. It's verbose, occasionally frustrating, and exactly the kind of work that teaches you how browsers actually function.

**Source:** [github.com/fr3akazo1d-sec/fr3akazo1d-sec.github.io](https://github.com/fr3akazo1d-sec/fr3akazo1d-sec.github.io)

---

*Updated: February 2026*
