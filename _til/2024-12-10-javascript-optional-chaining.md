---
layout: post
title: "JavaScript Optional Chaining ?."
date: 2024-12-10
category: JavaScript
tags: [javascript, es6, web-development]
description: Using optional chaining to safely access nested object properties without throwing errors.
---

Optional chaining `?.` prevents errors when accessing nested properties:

```javascript
// Instead of
const street = user && user.address && user.address.street;

// You can write
const street = user?.address?.street;

// Also works with functions
const result = someObj?.someMethod?.();
```

Much cleaner than multiple null checks!
