---
layout: post
title: devcontainers
date: 2025-01-13
category: containerization
description: What is devcontainers?
tags: [containerization, docker, devcontainers, devex]
---

## What I learned

During the year-end holiday, I spent some time learning about and experimenting with devcontainers, a tool I had heard of long ago but only recently dove into. I wanted to share my experience here.

So, what are devcontainers? According to its documentation:

“Dev containers allow you to use a container as a full-featured development environment. They can be used to run an application, separate tools, libraries, or runtimes needed for working with a codebase, and aid in continuous integration and testing. Dev containers can be run locally or remotely, in a private or public cloud, across various supporting tools and editors.”

As described, devcontainers are excellent for provisioning development environments. They let you specify everything a developer needs, including IDE extensions, CLI tools, and programming languages. This significantly improves the developer experience and productivity by enabling programmers to start coding on a project instantly, without the hassle of manually installing tools.

### My Projects with Devcontainers

Over the holiday, I created two repositories to explore devcontainers:

    - [irfansofyana/devcontainer-features](https://github.com/irfansofyana/devcontainer-features)
    - [irfansofyana/devcontainer-templates](https://github.com/irfansofyana/devcontainer-templates)

### Devcontainer-Features

Devcontainer-features are self-contained, shareable units of installation code and container configuration. Referencing a feature allows you to quickly add more tooling, runtimes, or libraries to your development container for yourself or collaborators.

I created devcontainer-features for some tools I frequently use in local development that I couldn’t find pre-existing features for, such as:

    - [kcat](https://github.com/edenhill/kcat): A tool for producing, consuming, and inspecting Kafka messages.
    - [lazydocker](https://github.com/jesseduffield/lazydocker): A simple terminal UI for managing Docker containers.

### Devcontainer-Templates

Devcontainer-templates are collections of source files packaged together to configure a complete development environment. These templates can be applied to new or existing projects, allowing tools to use the provided configuration to build the development container.

I currently created a [go-toolkit](https://github.com/irfansofyana/devcontainer-templates/tree/main/src/go-toolkit) devcontainer-template, which includes a variety of tools and services for building Go-based services. Some tools and services included are:

    - Kafka
    - MySQL
    - Redis
    - Adminer (DB UI)
    - Kafka UI
    - Go VS Code extensions
    - And more

## Final Thoughts

With devcontainers, developers no longer have excuses for struggling to set up local environments. It eliminates the infamous phrase: “It works on my machine, but I don’t know why it doesn’t work on yours!” 😂