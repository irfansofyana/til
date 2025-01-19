---
layout: post
title: extra_hosts-parameters-on-docker-compose
date: 2025-01-20
category: docker
description: extra_hosts parameter on docker-compose to connect to host machine
tags: [containerization, docker-compose]
---

## What I Learned

I've been exploring ways to use Ollama offline, one approach being Ollama. My go-to LLM UI is [Open WebUI](https://github.com/open-webui/open-webui), which I manage using Docker Compose. You can see my setup in more detail [here](https://brain.irfansp.dev/#/page/openweb-ui)

I'm looking for an alternative solution, where I keep the Open WebUI running in the container and run Ollama locally on my host machine. The reason behind this is because I have downloaded some models on my host and I think it will be much harder if I use or run the Ollama as a container.

After some research, I found that I can use the `extra_hosts`` parameter in Docker Compose to map host.docker.internal to the host machine's gateway IP. I added the following configuration to my Open WebUi container in the docker-compose.yml file:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

This directive updates the container's /etc/hosts file, mapping host.docker.internal to the host machine's gateway IP. With this setup, I can access Ollama on my host machine by using <http://host.docker.internal:11434> from the Open WebUI.

## References

- <https://stackoverflow.com/questions/29076194/using-add-host-or-extra-hosts-with-docker-compose>
