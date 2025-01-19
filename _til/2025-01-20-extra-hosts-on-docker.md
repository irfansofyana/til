---
layout: post
title: extra_hosts-parameters-on-docker-compose
date: 2025-01-20
category: docker
description: extra_hosts parameter on docker-compose to connect to host machine
tags: [containerization, docker-compose]
---

## What I learned

I'm currently exploring again how can I use LLM without internet, one of the way is using ollama.

I have my favorite LLM UI which is [Open WebUI](https://github.com/open-webui/open-webui) and I currently use the docker-compose to manage Open WebUI, my setup can be seen [here](https://brain.irfansp.dev/#/page/openweb-ui).

Now, I want something different, which is keeping my Open WebUI setup on container but keep the Ollama on my host machine.

There is the solution if we just use docker without docker-compose on this problem, and it can be seen [here](https://github.com/open-webui/open-webui#troubleshooting). But, in this case I run my openweb-ui using docker-compose so it's kinda different.

After some searched, I found that we can just add parameter `extra_hosts` in the Open WebUI container so that it can connect to Ollama in my host machine, specifically adding following:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

The extra_hosts directive adds an entry to the container’s /etc/hosts file, mapping host.docker.internal to the host’s gateway IP.

and in this case, to connect my Open WebUI to Ollama on my host machine I can use <http://host.docker.internal:11434>

## References

- <https://stackoverflow.com/questions/29076194/using-add-host-or-extra-hosts-with-docker-compose>
