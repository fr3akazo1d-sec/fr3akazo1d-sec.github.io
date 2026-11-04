# 📝 Quick Reference: Markdown Blog Posts

## ⚡ TL;DR - Three Commands

```bash
# 1. Create new post from template
cp blog/template.md blog/my-post.md

# 2. Edit it
nano blog/my-post.md

# 3. Convert to HTML
python3 convert_blog.py blog/my-post.md
```

Done! Your HTML is ready.

---

## 📄 Frontmatter Template

```yaml
---
title: Your Post Title
date: 2025-11-01
tags: [red-team, security]
reading_time: 10 min read
description: Brief description for SEO
---
```

---

## 🎨 Common Markdown Syntax

| What You Want | Markdown Syntax | Result |
|---------------|----------------|--------|
| Bold | `**text**` | **text** |
| Italic | `*text*` | *text* |
| Code | `` `code` `` | `code` |
| Link | `[text](url)` | [text](url) |
| Image | `![alt](url)` | Image |
| Quote | `> text` | Blockquote |
| List | `- item` | • item |
| Numbered | `1. item` | 1. item |
| Code Block | ` ```python ` | Code block |
| Heading 2 | `## Heading` | ## Heading |
| Heading 3 | `### Heading` | ### Heading |
| Line | `---` | Horizontal rule |

---

## 💻 Code Blocks

````markdown
```python
def hello():
    print("Hello!")
```
````

Supported languages:
- `python`, `bash`, `javascript`, `go`, `ruby`, `c`, `cpp`, `java`, etc.

---

## 📋 Complete Workflow

```bash
# In project root (/home/fr3akazo1d/personal-website)

# 1. New post
cp blog/template.md blog/red-team-ops.md

# 2. Edit
nano blog/red-team-ops.md

# 3. Convert
python3 convert_blog.py blog/red-team-ops.md

# 4. Test
python -m http.server 8000
# Visit: http://localhost:8000/blog/red-team-ops.html

# 5. Add to index.html
# (Copy snippet from converter output)

# 6. Deploy
git add .
git commit -m "Add: Red Team Operations post"
git push
```

---

## 🎯 File Naming

Good:
- `blog/building-c2-framework.md`
- `blog/osint-techniques.md`
- `blog/red-team-infrastructure.md`

Bad:
- `blog/My Post.md` (spaces)
- `blog/post1.md` (not descriptive)
- `blog/BLOGPOST.md` (all caps)

**Rule:** Use lowercase with hyphens (kebab-case)

---

## ✅ Pre-Publish Checklist

- [ ] Frontmatter filled out
- [ ] No typos in title
- [ ] Date is correct
- [ ] Tags are relevant
- [ ] Description is compelling
- [ ] Code blocks have language tags
- [ ] Images are added (if any)
- [ ] Links work
- [ ] Converted to HTML
- [ ] Tested locally
- [ ] Added to index.html

---

## 🆘 Quick Fixes

**Forgot frontmatter?**
```yaml
---
title: My Title
date: 2025-11-01
tags: [general]
---
```

**Code block not styling?**
- Add language: ` ```python ` (not just ` ``` `)

**HTML looks wrong?**
- Check your markdown syntax
- Re-run converter
- Clear browser cache

**Can't run converter?**
```bash
chmod +x convert_blog.py
python3 convert_blog.py blog/your-post.md
```

---

## 📚 Resources

- Full guide: `blog/MARKDOWN_GUIDE.md`
- Template: `blog/template.md`
- Example: `blog/building-custom-c2-framework.html`

---

**Happy writing!** ✍️
