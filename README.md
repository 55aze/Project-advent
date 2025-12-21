# 🎄 Build in Public - Advent Calendar

A beautiful, interactive advent calendar to showcase your daily product updates and build journey. Perfect for the "build in public" movement - ship daily, track progress, and share your wins.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5+-blue.svg)

## ✨ Features

- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and Shadcn UI
- 📅 **25-Day Calendar** - Track your entire month of daily releases
- 🎯 **Daily Updates** - Each day includes title, description, highlights, and GIFs
- 🐦 **X/Twitter Integration** - One-click sharing with pre-formatted updates
- 🔒 **Status Management** - Released, upcoming, and locked states
- 📱 **Responsive Design** - Works perfectly on all devices
- 🌙 **Dark Mode Ready** - Built-in support for dark theme

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Project-advent
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📝 Adding Daily Updates

Updates are stored in `src/data/updates.json`. To add a new day:

```json
{
  "day": 2,
  "date": "2025-12-02",
  "title": "Your Feature Title",
  "description": "Detailed description of what you built today...",
  "highlights": [
    "Key achievement 1",
    "Key achievement 2",
    "Key achievement 3"
  ],
  "gifUrl": "https://your-gif-url.com/demo.gif",
  "version": "v0.2.0",
  "status": "released",
  "tags": ["feature", "ui", "backend"]
}
```

### Status Options

- **`released`** - Day is complete and viewable (green theme)
- **`upcoming`** - Work in progress, viewable but not final (blue theme)
- **`locked`** - Not yet started, card is disabled (gray theme)

## 🎯 Workflow

### Daily Release Process

1. **Work on your project** (25 mins - 4 hours)
2. **Update the data**: Add your day's entry to `updates.json`
3. **Add media**: Upload GIF/screenshot and add URL to your update
4. **Commit & Push**: Ship it! (Even if it's broken - that's the point!)
5. **Share on X**: Use the built-in Twitter share feature

### Example Daily Workflow

```bash
# Edit your update
vim src/data/updates.json

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Day X: [Your Feature]"
git push

# Deploy (if using Vercel/Netlify)
# Automatic deployment on push
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI)
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📂 Project Structure

```
Project-advent/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   └── dialog.tsx
│   │   ├── AdventCard.tsx   # Individual day card
│   │   ├── AdventCalendar.tsx  # Main calendar grid
│   │   └── UpdateModal.tsx  # Detail modal
│   ├── data/
│   │   └── updates.json     # Your daily updates
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── update.ts        # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── public/                  # Static assets
└── README.md
```

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.js` to customize colors:

```js
colors: {
  primary: { ... },    // Red/Christmas theme
  secondary: { ... },  // Green theme
  // ... other colors
}
```

CSS variables are in `src/index.css`:

```css
:root {
  --primary: 346 77% 49%;     /* Christmas red */
  --secondary: 142 76% 36%;   /* Christmas green */
  /* ... */
}
```

### Project Info

Edit project metadata in `src/data/updates.json`:

```json
{
  "projectTitle": "Your Project Name",
  "projectDescription": "Your description...",
  "month": "December",
  "year": 2025
}
```

## 📱 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Deploy 'dist' folder to gh-pages branch
```

## 💡 Tips for Building in Public

1. **Ship Daily** - Even if it's broken, ship it. Document the journey.
2. **Be Honest** - Share failures and learnings, not just wins.
3. **Keep Highlights Short** - 3-5 bullet points per day.
4. **Use Visuals** - GIFs show progress better than words.
5. **Engage on X** - Use the share feature to build your audience.
6. **Version Everything** - Semantic versioning shows progression.

## 🤝 Contributing

Feel free to fork this project and customize it for your own build journey!

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Happy building! 🚀**

Remember: The goal isn't perfection - it's consistency and execution. Ship daily, learn constantly, build in public.
