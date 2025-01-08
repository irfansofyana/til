---
layout: post
title: "Python's Walrus Operator :="
date: 2024-12-15
categories: [Python, TIL]
tags: [python, syntax, programming]
description: Using Python's walrus operator := for assignment expressions in a single line.
---

The walrus operator `:=` lets you assign values in expressions:

```python
# Instead of
n = len(items)
if n > 10:
    print(f"List is too long ({n} elements)")

# You can write
if (n := len(items)) > 10:
    print(f"List is too long ({n} elements)")
```

Great for reducing code duplication!
