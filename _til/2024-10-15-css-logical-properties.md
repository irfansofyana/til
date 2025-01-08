---
layout: post
title: "CSS Logical Properties for Better Internationalization"
description: "Using CSS logical properties to handle different writing modes and text directions more effectively"
category: css
tags: [frontend, i18n, web-development]
---

Today I learned about CSS logical properties, which make it easier to handle different writing modes and text directions in web layouts.

Instead of using physical directions (left/right), use logical ones:
```css
/* Old way */
.element {
  margin-left: 1rem;
  padding-right: 2rem;
}

/* New way */
.element {
  margin-inline-start: 1rem;
  padding-inline-end: 2rem;
}
```

Key benefits:
- Better support for RTL languages
- Easier internationalization
- More maintainable code
- Future-proof layouts
