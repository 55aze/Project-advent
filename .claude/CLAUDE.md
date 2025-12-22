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

---

## 🚀 Development & Deployment Workflow

**Context:** User codes on phone via Claude Code web. Localhost doesn't work. Vercel is connected for auto-deploy.

### Standard Flow (Feature Branch → Preview → Production):

1. **Make Changes** - Edit code as requested

2. **Build Check** - ALWAYS run `npm run build` first
   - ✅ If passes: Safe to commit
   - ❌ If fails: Fix errors, DON'T commit yet

3. **Commit to Feature Branch** (when user approves)
   ```bash
   git add .
   git commit -m "descriptive message"
   git push origin claude/feature-name-sessionID
   ```

4. **Vercel Auto-Deploys Preview**
   - Each push to any branch gets instant preview URL
   - User checks preview on phone
   - Feature branch = safe space for iteration

5. **If Issues Found:**
   - Make more changes
   - Run build check
   - Commit + push to SAME branch
   - New preview URL generated
   - Repeat until happy

6. **If Happy with Preview:**
   - Merge feature branch → production branch
   - Vercel deploys to production
   - Feature complete!

### Key Principles:
- 🛡️ **Build verification prevents broken commits**
- 🔀 **Feature branches are safe for iteration**
- 🚫 **Never commit directly to production without testing**
- 📱 **All previews accessible on phone**
- ⚡ **Quick rollback if needed:** `git revert HEAD && git push`

**Note:** Since localhost doesn't work in Claude Code web, Vercel preview deployments are the primary way to see changes before production.

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

**Last Updated:** December 22, 2025
