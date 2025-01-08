---
layout: post
title: "CSS Container Queries"
date: 2024-12-20
category: CSS TIL
tags: [css, web-development, responsive-design]
description: Learning about CSS Container Queries and how they differ from media queries.
---

Container queries allow you to style elements based on their container's size, not just the viewport:

```css
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```

This is game-changing for component-based design!
