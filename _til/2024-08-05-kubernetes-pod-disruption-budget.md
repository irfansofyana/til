---
layout: post
title: "Kubernetes Pod Disruption Budgets for High Availability"
description: "Using PodDisruptionBudgets in Kubernetes to ensure application availability during voluntary disruptions"
category: kubernetes
tags: [devops, high-availability, containers]
---

Today I learned about Kubernetes PodDisruptionBudgets (PDB), which help maintain application availability during voluntary disruptions like node drains or cluster upgrades.

Example PDB:
```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: my-app
```

Key features:
- Specify minimum available pods
- Define maximum unavailable pods
- Protection during maintenance
- Automatic enforcement

Use cases:
- Node maintenance
- Cluster upgrades
- Scaling operations
- Zone failures
