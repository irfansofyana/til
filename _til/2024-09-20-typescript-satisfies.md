---
layout: post
title: "TypeScript 'satisfies' Operator for Better Type Checking"
description: "Using the 'satisfies' operator in TypeScript 4.9+ to validate object literals against a type while preserving their literal types"
category: typescript
tags: [javascript, type-safety, programming]
---

Today I learned about TypeScript's `satisfies` operator, which helps validate object literals against a type while preserving their literal types.

Example usage:
```typescript
type Colors = 'red' | 'green' | 'blue';
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255]
} satisfies Record<Colors, RGB>;

// Type is preserved!
const redChannel = palette.red[0]; // type is number
const colors = Object.keys(palette); // type is ("red" | "green" | "blue")[]
```

Benefits:
- Better type inference
- Catch type errors early
- Preserve literal types
- More precise autocomplete
