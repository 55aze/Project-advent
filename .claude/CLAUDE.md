# Project Instructions for Claude Code

## 🚀 Development & Deployment Workflow

**Context:** User codes on phone via Claude Code web. Localhost doesn't work. Vercel is connected for auto-deploy.

### Automated Phone-Friendly Flow:

#### Phase 1: Development & Preview (Automated)
1. **Make Changes** - Claude edits code as requested
2. **Build Check** - ALWAYS run `npm run build` first
   - ✅ If passes: Safe to commit
   - ❌ If fails: Fix errors, DON'T commit yet
3. **Auto-Commit & Push to Feature Branch**
   - Automatically commit with descriptive message
   - Push to `claude/feature-name-sessionID` branch
   - Vercel auto-deploys preview URL
4. **Tell User to Review**
   - Provide Vercel preview URL (check Vercel dashboard)
   - User reviews on phone
   - WAIT for user approval

#### Phase 2: Deploy to Production (Manual Approval Required)
5. **User Reviews Preview**
   - If issues found: Make more changes, repeat from step 1
   - If happy: User says **"push to main"** or **"deploy to production"**
6. **Merge to Production** (only when user approves)
   - Merge feature branch → `claude/christmas-product-build-gOaqd` (production branch)
   - Push to production branch
   - Vercel auto-deploys to production
   - Done! 🎉

### Key Principles:
- 🛡️ **Build verification prevents broken commits**
- 🔀 **Feature branches auto-deploy for preview**
- 🚫 **Production requires explicit user approval**
- 📱 **All previews accessible on phone via Vercel**
- ⚡ **Quick rollback if needed:** `git revert HEAD && git push`
- 🤖 **Automated preview, manual production**

### Production Branch:
- Main production branch: `claude/christmas-product-build-gOaqd`
- Only merge here when user explicitly approves with:
  - "push to main"
  - "deploy to production"
  - "merge to production"
  - "looks good, deploy it"

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
