---
layout: post
title: "Markdown Cheat Sheet - Quick Reference"
date: 2025-11-03
tags: [documentation, tools, reference]
author: fr3akazo1d
reading_time: "8 min read"
---

Quick reference guide for Markdown syntax with examples. Because even hackers need documentation.

## Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

## Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

**Bold text**  
*Italic text*  
***Bold and italic***  
~~Strikethrough~~  
`Inline code`

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested item
```

1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested item

## Links and Images

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
![Alt text](image.png)
![Alt text with title](image.png "Image title")
```

## Code Blocks

### Inline Code

Use backticks: `code here`

### Code Blocks with Syntax Highlighting

````markdown
```python
def exploit():
    print("Getting shell...")
    return shell
```

```bash
#!/bin/bash
echo "Pwned!"
```
````

```python
def exploit():
    print("Getting shell...")
    return shell
```

```bash
#!/bin/bash
echo "Pwned!"
```

## Blockquotes

```markdown
> Single line quote
> 
> Multi-line quote
> continues here
> 
> > Nested quote
```

> Single line quote
> 
> Multi-line quote
> continues here
> 
> > Nested quote

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

| Left align | Center align | Right align |
|:-----------|:------------:|------------:|
| Left       | Center       | Right       |
```

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

| Left align | Center align | Right align |
|:-----------|:------------:|------------:|
| Left       | Center       | Right       |

## Horizontal Rules

```markdown
---
***
___
```

---

## Task Lists

```markdown
- [x] Recon phase complete
- [x] Exploit developed
- [ ] Get shell access
- [ ] Maintain persistence
- [ ] Exfiltrate data
```

- [x] Recon phase complete
- [x] Exploit developed
- [ ] Get shell access
- [ ] Maintain persistence
- [ ] Exfiltrate data

## Mermaid Diagrams

You can create flowcharts, sequence diagrams, and more with Mermaid:

### Attack Flow Diagram

```mermaid
flowchart TD
    A[Reconnaissance] --> B{Target Found?}
    B -->|Yes| C[Vulnerability Scanning]
    B -->|No| A
    C --> D{Vulnerability Exists?}
    D -->|Yes| E[Exploit Development]
    D -->|No| C
    E --> F[Gain Access]
    F --> G[Privilege Escalation]
    G --> H[Maintain Persistence]
    H --> I[Mission Complete]
    
    style A fill:#00fff7,stroke:#00fff7,color:#000
    style I fill:#39ff14,stroke:#39ff14,color:#000
    style F fill:#ff003c,stroke:#ff003c,color:#fff
```

### Network Topology

```mermaid
graph LR
    A[Attacker] -->|Phishing| B[User Workstation]
    B -->|Lateral Movement| C[Domain Controller]
    C -->|Admin Access| D[File Server]
    C -->|Admin Access| E[Database Server]
    D -->|Exfiltration| A
    E -->|Exfiltration| A
    
    style A fill:#ff003c,stroke:#ff003c,color:#fff
    style C fill:#00fff7,stroke:#00fff7,color:#000
    style D fill:#39ff14,stroke:#39ff14,color:#000
    style E fill:#39ff14,stroke:#39ff14,color:#000
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant A as Attacker
    participant T as Target Server
    participant DB as Database
    
    A->>T: Initial Recon
    T-->>A: Service Banner
    A->>T: Send Exploit
    T->>T: Execute Payload
    T-->>A: Reverse Shell
    A->>T: Enumerate System
    T-->>A: System Info
    A->>T: Query Database
    T->>DB: SQL Query
    DB-->>T: Sensitive Data
    T-->>A: Data Exfiltration
    
    Note over A,DB: Attack Complete
```

## Escaping Characters

Use backslash to escape special characters:

```markdown
\* Not italic \*
\# Not a header
\`Not code\`
\[Not a link\]
```

## HTML in Markdown

You can also use HTML directly in Markdown:

```html
<div style="color: #00fff7;">
  Custom styled text
</div>

<details>
  <summary>Click to expand</summary>
  Hidden content here
</details>
```

<details>
  <summary>Click to expand</summary>
  Hidden content here - useful for long code snippets or detailed explanations!
</details>

## Quick Tips

1. **Preview as you write** - Most editors support live Markdown preview
2. **Use relative links** for internal documentation
3. **Keep it simple** - Markdown is meant to be readable as plain text
4. **Tables can be tricky** - Use a generator if needed
5. **Mermaid diagrams** - Great for documenting attack paths and architectures

## Useful Resources

- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Mermaid Documentation](https://mermaid-js.github.io/)

---

**Pro tip:** Most documentation platforms support Markdown. Master it once, use it everywhere - from GitHub README files to internal security documentation.
