---
title: "My 2024 Development Setup: Tools That Actually Matter"
excerpt: "A practical look at the tools, configurations, and workflows that have made me more productive as a developer."
coverImage: "/assets/blog/setup/cover.jpg"
date: "2024-02-28T12:00:00.000Z"
author:
  name: "Cain"
  picture: "/assets/blog/authors/cain.jpeg"
  bio: "Junior Software Engineer passionate about Server and Infrastructure Engineering"
  social:
    github: "gunb0s"
    website: "https://gunb0s.github.io/"
ogImage:
  url: "/assets/blog/setup/cover.jpg"
tags: ["productivity", "tools", "development", "workflow", "terminal"]
category: "productivity"
featured: false
status: "published"
summary: "An honest review of the development tools and setup that have genuinely improved my daily coding experience."
---

After years of constantly tweaking my development environment, I've finally settled on a setup that just works. Here's what I use daily and why these tools have stuck around.

## The Core Stack

### Editor: VS Code + Vim Extension

I've tried them all - Vim, Neovim, IntelliJ, Sublime Text. But VS Code with the Vim extension gives me the best of both worlds:

- Vim keybindings for editing efficiency
- Rich ecosystem of extensions
- Excellent debugging capabilities
- Great Git integration

**Key Extensions:**

- Vim (obvious reasons)
- GitLens (git blame and history)
- Thunder Client (API testing)
- Error Lens (inline error display)

### Terminal: iTerm2 + Oh My Zsh

My terminal setup focuses on information density and speed:

```bash
# My essential aliases
alias ll='ls -la'
alias g='git'
alias gst='git status'
alias gco='git checkout'
alias gp='git push'
alias gc='git commit -m'

# Docker shortcuts
alias dps='docker ps'
alias dcu='docker-compose up'
alias dcd='docker-compose down'
```

### Version Control: Git + GitHub CLI

I've streamlined my Git workflow with these configurations:

```bash
# Global Git config highlights
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
```

## Development Tools

### API Development: Bruno/Postman

For API testing and development, I use Bruno for personal projects and Postman for team work. Bruno's local-first approach appeals to me, but Postman's collaboration features are unmatched.

### Database: TablePlus

Best database GUI I've used. Clean interface, supports multiple database types, and excellent query building capabilities.

### Containerization: Docker Desktop

Essential for consistent development environments. My standard `docker-compose.yml` template:

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
```

## Productivity Boosters

### Task Management: Notion

I use Notion for everything:

- Project planning and tracking
- Meeting notes and documentation
- Personal knowledge base
- Code snippets and learnings

### Focus: Time-blocking + Pomodoro

My daily schedule follows strict time-blocking:

- 9-11 AM: Deep work (coding)
- 11-12 PM: Meetings/communication
- 1-3 PM: Deep work (coding)
- 3-4 PM: Learning/research
- 4-5 PM: Admin/planning

## The Philosophy

The key insight I've learned: **tools should disappear**. The best setup is one you don't think about. Every tool in my stack serves a specific purpose and has earned its place through daily use.

I've stopped chasing the latest tools and instead focused on mastering the ones I have. This approach has made me significantly more productive and less distracted by shiny new tools.

## What's Next?

I'm currently exploring:

- Tmux for better terminal session management
- Raycast as a Spotlight replacement
- Linear for project management (might replace Notion)

What tools have genuinely improved your development workflow? I'm always curious to hear what works for others!
