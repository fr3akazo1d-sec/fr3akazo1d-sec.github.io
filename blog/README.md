# fr3akazo1d Blog Posts

This directory will contain your blog posts in HTML or Markdown format.

## 📝 Blog Structure

Each blog post should follow this structure:

```
blog/
├── building-custom-c2-framework.html
├── bypassing-edr-process-injection.html
├── osint-techniques-red-team.html
└── red-team-toolkit.html
```

## ✍️ Creating a Blog Post

### Option 1: HTML Template (Inline with Site)

Create a new HTML file using the template below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Blog Post Title | fr3akazo1d</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/blog.css">
</head>
<body>
    <nav class="nav-menu">
        <ul>
            <li><a href="../index.html#home" class="nav-link">← Back to Home</a></li>
        </ul>
    </nav>

    <article class="blog-post">
        <header class="post-header">
            <h1 class="post-title glitch" data-text="Your Blog Post Title">Your Blog Post Title</h1>
            <div class="post-meta">
                <span class="post-date">[2025-11-01]</span>
                <span class="post-tag">#red-team</span>
                <span class="post-reading-time">10 min read</span>
            </div>
        </header>

        <div class="post-content">
            <p>Your blog post content goes here...</p>
            
            <h2>Section Heading</h2>
            <p>More content...</p>

            <pre><code>// Code examples
function example() {
    console.log("Hello, world!");
}</code></pre>
        </div>
    </article>

    <script src="../js/main.js"></script>
</body>
</html>
```

### Option 2: Markdown (requires conversion)

Create `.md` files and convert to HTML using tools like:
- Pandoc
- Jekyll
- Hugo
- Custom Node.js script

### Option 3: External Platform

Link to posts on:
- Medium
- Dev.to
- Hashnode
- Personal blog platform

## 🎨 Blog Post Styling

Create `css/blog.css` for blog-specific styles:

```css
.blog-post {
    max-width: 800px;
    margin: 100px auto;
    padding: 2rem;
}

.post-header {
    margin-bottom: 3rem;
    text-align: center;
}

.post-title {
    font-size: 3rem;
    color: var(--accent-cyan);
    margin-bottom: 1rem;
}

.post-meta {
    display: flex;
    justify-content: center;
    gap: 2rem;
    color: var(--text-main);
}

.post-content {
    line-height: 1.8;
    color: var(--text-main);
}

.post-content h2 {
    color: var(--accent-cyan);
    margin: 2rem 0 1rem;
}

.post-content pre {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    border: 1px solid var(--accent-cyan);
}

.post-content code {
    font-family: var(--font-mono);
    color: var(--accent-red);
}
```

## 📋 Blog Post Template Variables

When creating a new post, update:

1. **Title**: Post headline
2. **Date**: Publication date in `[YYYY-MM-DD]` format
3. **Tags**: Category tags (e.g., #red-team, #osint, #tools)
4. **Reading Time**: Estimated time to read
5. **Content**: Main post content
6. **Code Examples**: Syntax-highlighted code blocks
7. **Images**: Add to `assets/blog/` directory

## 🔗 Linking Blog Posts

Update `index.html` blog cards to link to actual posts:

```html
<article class="blog-card">
    <!-- ... card header ... -->
    <a href="blog/your-post.html" class="card-link">Read more <span class="arrow">→</span></a>
</article>
```

## 📱 Responsive Considerations

- Keep paragraphs readable (max 75 characters per line)
- Use proper heading hierarchy (h1 → h2 → h3)
- Optimize images for web (< 200KB)
- Test on mobile devices

## 🚀 Publishing Workflow

1. Write post in your preferred format
2. Add images to `assets/blog/`
3. Update `index.html` blog section
4. Test locally
5. Commit and push to GitHub
6. Verify on GitHub Pages

---

**Happy blogging!** 🚀
