---
layout: post
title: "Jekyll build"
date: 2025-01-08
category: Jekyll
tags: [jekyll, Github Pages]
---

## What I learned

After developing https://github.com/irfansofyana/til-template and deployed it to GitHub actions, I didn't check again whether I can run this project locally or not.

Turns out I can't. It's because the `__config.yml` specified in the repository is for production build and I need to update it when I do development locally. Hence the solution was to add this flag:

```bash
--baseurl ''
```

in the `docker-compose.yml` file to override the baseUrl in the `__config.yml`.

It's a shame that I didn't check this earlier.

Hey this is also my first TIL post on this site!
