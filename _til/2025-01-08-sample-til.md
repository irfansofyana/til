---
layout: post
title: "Sample TIL: Using Jekyll Collections"
date: 2025-01-08
category: Jekyll
tags: [jekyll, static-site, markdown]
---

Today I learned how to use Jekyll collections to organize content. Collections in Jekyll are a great way to group related content that share similar attributes and should be treated similarly.

## What I Learned

    1. Collections are defined in `_config.yml`
    2. Each collection needs its own folder prefixed with `_`
    3. Collection items can have their own layouts
    4. Collections can be output as pages by setting `output: true`

## Why It's Useful

Collections provide a more structured way to organize content compared to regular posts, especially when the content doesn't fit into the typical blog post format.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```