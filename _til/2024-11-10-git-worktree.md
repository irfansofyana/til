---
layout: post
title: "Git Worktree: Working with Multiple Branches"
description: "How to use git worktree to work on multiple branches simultaneously without stashing or switching branches"
category: git
tags: [version-control, productivity]
---

Today I learned about Git Worktree, a powerful feature that lets you work on multiple branches simultaneously. Instead of stashing changes or constantly switching branches, you can create separate working directories for different branches.

Basic commands:
```bash
# Add a new worktree
git worktree add ../feature-branch feature-branch

# List worktrees
git worktree list

# Remove a worktree
git worktree remove feature-branch
```

This is especially useful when:
- Working on multiple features simultaneously
- Reviewing pull requests while continuing development
- Hotfixing production issues without disrupting current work
