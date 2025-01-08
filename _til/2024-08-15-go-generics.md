---
layout: post
title: "Go 1.18 Generics: Type Parameters and Constraints"
description: "Using Go's generic programming features to write more reusable and type-safe code without sacrificing performance"
category: go
tags: [programming, type-safety, performance]
---

Today I learned about Go's generic programming features, introduced in Go 1.18, which allow for type-safe, reusable code without runtime overhead.

Example generic function:
```go
func Map[T, U any](slice []T, f func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = f(v)
    }
    return result
}

// Usage
numbers := []int{1, 2, 3, 4}
squares := Map(numbers, func(x int) int {
    return x * x
})
```

Key concepts:
- Type parameters with constraints
- Interface type sets
- Type inference
- Zero runtime overhead
