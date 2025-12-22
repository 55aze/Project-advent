# Project Instructions for Claude Code

## 🚨 GIT COMMIT POLICY - CRITICAL

**NEVER commit changes unless explicitly instructed by the user.**

### Rules:
- ❌ **DO NOT** run `git commit` automatically
- ❌ **DO NOT** run `git push` automatically
- ❌ **DO NOT** assume the user wants changes committed
- ✅ **ONLY** commit when user explicitly says:
  - "commit these changes"
  - "git commit"
  - "push to git"
  - "save this to git"

### Workflow:
1. Make code changes as requested
2. Let user test locally with `npm run dev`
3. Wait for explicit commit instruction
4. Only then: `git add`, `git commit`, `git push`

---

## 📦 Project Information

- **Project Name:** 25 Days of Shipping
- **Type:** Multi-project build tracker
- **Design Style:** Brutalist / Retro / Pixel Art

---

## 🛠️ Tech Stack

### Core:
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI & Styling:
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animation library
- **SF Symbols** - Icon system

### Design System:
- Maintain consistent theming via `src/index.css`
- Use CSS variables for colors and spacing
- Follow design tokens in `.claude/skills/frontend-design/`
- Reference component patterns for consistency

---

## 🎨 Design Guidelines

### Brutalist Retro Theme:
- NO rounded corners (border-radius: 0)
- Pixel borders with shadow offsets
- Bold colors: Hot Pink (#FF006E), Purple (#8338EC), Blue (#3A86FF)
- Retro fonts: Press Start 2P (headings), Space Mono (body)
- No gradients or soft shadows
- Use pixel-border, pixel-border-sm, pixel-border-lg utility classes

---

## 🛠️ Development Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

---

**Last Updated:** December 21, 2025
