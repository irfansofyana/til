---
layout: post
title: "Recording Macros in Vim"
date: 2024-11-28
category: Vim
tags: [vim, productivity, text-editor]
description: How to record and use macros in Vim for repetitive text editing tasks.
---

To record a macro in Vim:

1. Press `q` followed by a letter (e.g., `qa` to record to register 'a')
2. Perform your actions
3. Press `q` to stop recording
4. Use `@a` to replay or `10@a` to replay 10 times

Example macro to add quotes around words:
```vim
qa         # start recording to register a
ciw""<Esc> # change inner word, type quotes
P          # paste the word between quotes
q          # stop recording
```
