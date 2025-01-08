---
layout: post
title: "Python Structural Pattern Matching (Match Case)"
description: "Using Python 3.10's pattern matching feature for more expressive and powerful switch-case style control flow"
category: python
tags: [programming, syntax, control-flow]
---

Today I learned about Python's structural pattern matching (match-case), introduced in Python 3.10. It's much more powerful than a simple switch statement.

Basic syntax:
```python
def process_command(command):
    match command.split():
        case ["quit"]:
            return "Exiting..."
        case ["load", filename]:
            return f"Loading {filename}..."
        case ["save", filename, "as", format]:
            return f"Saving {filename} as {format}..."
        case _:
            return "Unknown command"
```

Advanced features:
- Pattern matching with classes
- Destructuring nested structures
- Guard clauses with if conditions
- OR patterns using |
- Wildcard patterns with _
