# Today I Learned Template

A GitHub Pages template for creating your own Today I Learned (TIL) website. Document and share your daily learnings in an organized and searchable way. This project is inspired by https://til.simonwillison.net/ and some others that I found.

## Features

- 📝 Write TILs in Markdown
- 🔍 Full-text search functionality
- 🏷️ Tag support with dedicated tag pages
- 📱 Responsive design
- 🚀 Fast and lightweight
- 🐳 Docker support for easy development
- 🔄 Automated GitHub Pages deployment with CI/CD
- ⚡ Optimized build performance with caching
- 🛡️ Secure deployment with GitHub Actions

## Getting Started

1. Click "Use this template" to create your own repository
2. Update `_config.yml` with your site information:
   - Change `title`, `html_title`, `site_name`, and `description`
   - Update `baseurl` to match your repository name
   - Update `url` if using a custom domain

3. Add your TILs in the `_til` directory following the format:
   ```markdown
   ---
   layout: post
   title: "Your TIL Title"
   date: YYYY-MM-DD
   tags: [tag1, tag2]
   ---

   Your content here in Markdown
   ```

4. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Set source to `main` branch
   - Save changes

## Customizing Your TIL Site

### Site Configuration

1. Update `_config.yml` with your preferences:
   ```yaml
   title: "Today I Learned"
   html_title: "TIL - Your Daily Learning Notes"
   site_name: "Today I Learned"
   description: "A collection of things I learn day to day"
   baseurl: ""  # If using GitHub Pages with custom domain
   url: ""      # Your site URL
   ```

2. Customize the appearance:
   - Modify `assets/css/syntax.css` for code highlighting
   - Edit `_layouts/post.html` for post layout
   - Update `index.html` for the main page layout

3. Optional configurations:
   - Add Google Analytics by updating the tracking ID in `_config.yml`
   - Customize the search functionality in `search.html`
   - Modify tag display in `tags.html`

## Creating New Posts

### Option 1: Manual Creation

1. Create a new file in the `_til` directory with the format: `YYYY-MM-DD-title-slug.md`
2. Add the front matter:
   ```markdown
   ---
   layout: post
   title: "Your TIL Title"
   date: YYYY-MM-DD
   category: Category
   tags: [tag1, tag2]
   ---
   ```
3. Write your content in Markdown below the front matter

### Option 2: Using the Command Line

1. From your project root, run:
   ```bash
   # Replace the title with your post title (use quotes for multiple words)
   DATE=$(date +%Y-%m-%d) TITLE="your-title" && touch "_til/$DATE-$TITLE.md"
   ```

2. Use this template for your new post:
   ```markdown
   ---
   layout: post
   title: "Your Title Here"
   date: YYYY-MM-DD
   category: Category
   tags: [tag1, tag2]
   ---

   ## What I Learned

   Brief description of what you learned.

   ## Why It's Useful

   Explain why this knowledge is valuable.

   ## Example

   ```code
   # Your code example here
   ```

   ## References

   - [Link Description](URL)
   ```

### Categories vs Tags

When creating a new TIL post, you'll need to specify both a category and tags. Here's how to use them:

### Categories
- Use **one** category per post
- Categories represent the main technology or domain of your learning
- Should be a single word or simple term
- Examples: `Jekyll`, `Docker`, `Git`, `Python`, `AWS`

### Tags
- Can use **multiple** tags per post
- Tags are more specific descriptors or sub-topics
- Help in detailed classification and searching
- Examples: `deployment`, `caching`, `optimization`, `security`

Example frontmatter:
```yaml
---
layout: post
title: "Docker Layer Caching Tips"
date: 2025-01-08
category: Docker
tags: [containers, optimization, caching, deployment]
---
```

### Best Practices

1. Keep titles clear and concise
2. Use relevant tags for better organization
3. Include code examples when applicable
4. Add references to source materials
5. Use headers to organize content
6. Include practical examples or use cases

## Local Development

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Site

1. Clone your repository:
   ```bash
   git clone <your-repository-url>
   cd <repository-name>
   ```

2. Start the development server:
   ```bash
   docker-compose up
   ```

3. Visit `http://localhost:4000` in your browser

The site will automatically rebuild when you make changes to any source files.

### Docker Commands

- Stop the server:
  ```bash
  docker-compose down
  ```

- Rebuild the container (after Gemfile changes):
  ```bash
  docker-compose up --build
  ```

- View logs:
  ```bash
  docker-compose logs
  ```

## License

This project is open source and available under the [MIT License](LICENSE).
