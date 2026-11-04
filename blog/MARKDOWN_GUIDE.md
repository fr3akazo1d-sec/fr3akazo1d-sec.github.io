# 📝 Markdown Blog Workflow Guide

Write your blog posts in Markdown and automatically convert them to HTML!

## 🚀 Quick Start

### 1. Create a New Markdown Post

```bash
# Copy the template
cp blog/template.md blog/my-new-post.md

# Edit with your favorite editor
nano blog/my-new-post.md
# or
code blog/my-new-post.md
```

### 2. Write Your Post

Edit the frontmatter (metadata at the top):

```yaml
---
title: Building Red Team Infrastructure
date: 2025-11-01
tags: [red-team, infrastructure, aws]
reading_time: 12 min read
description: Learn how to build scalable red team infrastructure using cloud providers
---
```

Then write your content in Markdown below the `---`.

### 3. Convert to HTML

```bash
# Convert your markdown file to HTML
python3 convert_blog.py blog/my-new-post.md
```

That's it! Your HTML file is ready at `blog/my-new-post.html`

---

## 📋 Complete Example

### Step 1: Create Your Markdown File

```bash
# Create a new post
nano blog/red-team-infrastructure.md
```

### Step 2: Write Your Content

```markdown
---
title: Building Red Team Infrastructure
date: 2025-11-01
tags: [red-team, infrastructure, cloud]
reading_time: 12 min read
description: A comprehensive guide to building scalable red team infrastructure
---

# Introduction

Red team infrastructure is the backbone of successful offensive operations...

## Cloud Provider Selection

When choosing a cloud provider, consider:

- Cost efficiency
- Geographic distribution
- API capabilities

### AWS Setup

Here's how to set up a redirector on AWS:

\`\`\`bash
# Launch an EC2 instance
aws ec2 run-instances \\
  --image-id ami-xxxxx \\
  --instance-type t2.micro \\
  --key-name mykey
\`\`\`

## Conclusion

Proper infrastructure is crucial for red team success.
```

### Step 3: Convert to HTML

```bash
python3 convert_blog.py blog/red-team-infrastructure.md
```

**Output:**
```
📖 Reading blog/red-team-infrastructure.md...
✓ Title: Building Red Team Infrastructure
✓ Date: 2025-11-01
✓ Tags: red-team, infrastructure, cloud
🔄 Converting Markdown to HTML...
💾 Writing blog/red-team-infrastructure.html...

✅ Success! Blog post created: blog/red-team-infrastructure.html
```

### Step 4: Add to index.html

Copy the generated HTML snippet and add it to your `index.html` blog section:

```html
<article class="blog-card">
    <div class="card-header">
        <span class="card-date">[2025-11-01]</span>
        <span class="card-tag">#red-team</span>
    </div>
    <h3 class="card-title">Building Red Team Infrastructure</h3>
    <p class="card-excerpt">
        A comprehensive guide to building scalable red team infrastructure
    </p>
    <a href="blog/red-team-infrastructure.html" class="card-link">Read more <span class="arrow">→</span></a>
</article>
```

---

## 📝 Markdown Features Supported

### Headings
```markdown
# H1 - Main Title
## H2 - Section
### H3 - Subsection
#### H4 - Minor heading
```

### Text Formatting
```markdown
**bold text**
*italic text*
`inline code`
~~strikethrough~~
```

### Lists
```markdown
- Unordered list
- Another item
  - Nested item

1. Ordered list
2. Second item
3. Third item
```

### Code Blocks
````markdown
```python
def hello():
    print("Hello, world!")
```

```bash
echo "Shell commands"
```
````

### Links and Images
```markdown
[Link text](https://example.com)
![Image alt text](../assets/blog/image.png)
```

### Blockquotes
```markdown
> This is a quote or important callout
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Horizontal Rules
```markdown
---
```

---

## 🎨 Frontmatter Fields

All fields in the frontmatter (metadata section):

```yaml
---
title: Your Post Title              # Required
date: 2025-11-01                   # Required (YYYY-MM-DD)
tags: [tag1, tag2, tag3]           # Optional, defaults to [general]
reading_time: 10 min read          # Optional, defaults to "5 min read"
description: Brief description     # Optional, used for SEO
---
```

**Tips:**
- `title`: Keep it concise and descriptive
- `date`: Use YYYY-MM-DD format
- `tags`: First tag becomes the primary tag on the card
- `reading_time`: Estimate based on word count (200 words/min)
- `description`: Used in meta tags and blog card excerpt

---

## 🔧 Advanced Usage

### Custom Styling

The converter automatically applies the fr3akazo1d theme styling. Code blocks are converted to terminal-style windows.

### Inline HTML

You can use HTML directly in your Markdown if needed:

```markdown
<div class="terminal-code">
    <div class="terminal-code-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
    </div>
    <div class="terminal-code-body">
        <pre><code>Custom terminal content</code></pre>
    </div>
</div>
```

### Multiple Tags

```yaml
tags: [red-team, c2, python, evasion]
```

First tag is used as the primary tag in the blog card.

---

## 📦 Dependencies

The converter requires the `markdown` Python library:

```bash
# Install manually if needed
pip install markdown
```

The script will auto-install it if missing.

---

## 🔄 Workflow Summary

```bash
# 1. Copy template
cp blog/template.md blog/new-post.md

# 2. Edit your post
nano blog/new-post.md

# 3. Convert to HTML
python3 convert_blog.py blog/new-post.md

# 4. Add to index.html (copy snippet from output)

# 5. Test locally
python -m http.server 8000

# 6. Commit and push
git add .
git commit -m "Add new blog post: Your Title"
git push
```

---

## ✅ Benefits of Markdown Workflow

1. **Faster writing** - Focus on content, not HTML
2. **Portable** - Markdown works everywhere
3. **Version control** - Easy to track changes
4. **Reusable** - Can convert to other formats
5. **Clean** - Much easier to read and edit than HTML
6. **Consistent** - Template ensures uniform styling

---

## 🆘 Troubleshooting

### "markdown library not found"
The script will auto-install it, but you can install manually:
```bash
pip install markdown
```

### "File not found"
Make sure you're in the project root directory:
```bash
cd /home/fr3akazo1d/personal-website
python3 convert_blog.py blog/your-post.md
```

### Code blocks not rendering
Make sure to use triple backticks with language identifier:
````markdown
```python
your code here
```
````

### Frontmatter not working
Ensure the frontmatter is at the very start of the file with `---` delimiters:
```yaml
---
title: Your Title
date: 2025-11-01
---

Content starts here...
```

---

## 📚 Examples

See `blog/template.md` for a comprehensive example with all supported features.

---

## 🎯 Pro Tips

1. **Write in drafts** - Keep markdown files in `blog/drafts/` until ready
2. **Use descriptive filenames** - `blog/red-team-c2-frameworks.md`
3. **Preview before converting** - Use VS Code markdown preview
4. **Keep backups** - The `.md` files are your source of truth
5. **Consistent naming** - Use kebab-case for filenames
6. **Test converted HTML** - Always preview before deploying

---

**Happy blogging!** ✍️

Keep your `.md` files as source, commit both `.md` and `.html` to Git.
