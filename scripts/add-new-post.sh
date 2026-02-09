#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BLOG_DIR="${SCRIPT_DIR}/../src/pages/blog"
LANGUAGES=(en ru)

read -r -p "Please, enter the post title: [no-title] " post_title
post_title="${post_title:-no-title}"

today_date="$(date -u +%Y-%m-%d)"
today_time="$(date -u +%H:%M:%S)"

title_with_dashes="$(echo "$post_title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')"

new_post_folder="${BLOG_DIR}/${today_date}-${title_with_dashes}"

mkdir -p "$new_post_folder"

title_escaped="${post_title//\'/\'\\\'\'}"

frontmatter="---
date: ${today_date} ${today_time}
title: '${title_escaped}'
type: post
---
"

for lang in "${LANGUAGES[@]}"; do
  echo "$frontmatter" > "${new_post_folder}/index.${lang}.md"
done

echo "Created: ${new_post_folder}/"
echo "  index.en.md"
echo "  index.ru.md"
