#!/bin/bash

if [ $# -lt 2 ]; then
    echo "Usage: $0 <title> <category>"
    exit 1
fi

TITLE="$1"
CATEGORY="$2"
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
DATE=$(date +%Y-%m-%d)
FILE="_til/$DATE-$FILENAME.md"

cat << EOF > "$FILE"
---
layout: post
title: $TITLE
date: $DATE
category: $CATEGORY
description: ...
tags: []
---
EOF

echo "Created $FILE"