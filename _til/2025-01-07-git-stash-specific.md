---
layout: post
title: "Stashing Specific Files in Git"
date: 2025-01-07
category: Git
tags: [git, version-control, productivity]
description: How to stash specific files instead of all changes in your working directory.
---

I discovered that you can stash specific files in Git instead of stashing all changes:

```bash
git stash push -m "my_stash" path/to/file1.txt path/to/file2.txt
```

To apply a specific stash:
```bash
git stash apply stash@{n}
```

This is super useful when you want to save only certain changes!
