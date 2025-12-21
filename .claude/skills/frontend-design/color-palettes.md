# Frontend Color Palette Library

## Modern Tech Stack (Blue/Cyan)

### Light Mode
```css
--primary: #0EA5E9        /* Sky Blue */
--primary-dark: #0284C7   /* Darker Sky */
--primary-light: #38BDF8  /* Light Sky */

--secondary: #8B5CF6      /* Violet */
--accent: #10B981         /* Emerald */

--background: #F8FAFC     /* Slate 50 */
--surface: #FFFFFF        /* White */
--text: #1E293B           /* Slate 800 */
--text-muted: #64748B     /* Slate 500 */
--border: #E2E8F0         /* Slate 200 */

--success: #10B981        /* Green */
--warning: #F59E0B        /* Amber */
--error: #EF4444          /* Red */
--info: #3B82F6           /* Blue */
```

### Dark Mode
```css
--background: #0F172A     /* Slate 900 */
--surface: #1E293B        /* Slate 800 */
--text: #F1F5F9           /* Slate 100 */
--text-muted: #94A3B8     /* Slate 400 */
--border: #334155         /* Slate 700 */
```

## Warm Professional (Orange/Purple)

```css
--primary: #F59E0B        /* Amber */
--primary-dark: #D97706   /* Darker Amber */
--primary-light: #FCD34D  /* Light Amber */

--secondary: #8B5CF6      /* Violet */
--accent: #EC4899         /* Pink */

--background: #FFFBEB     /* Amber 50 */
--surface: #FFFFFF
--text: #78350F           /* Amber 900 */
--text-muted: #92400E     /* Amber 800 */
--border: #FDE68A         /* Amber 200 */
```

## Brutalist/Retro (Your Current Theme!)

```css
--primary: #FF006E        /* Hot Pink */
--secondary: #8338EC      /* Purple */
--accent: #3A86FF         /* Blue */

--background: #FAFAFA     /* Near White */
--foreground: #0D0D0D     /* Near Black */
--surface: #FFFFFF
--muted: #D9D9D9          /* Light Gray */

/* No gradients, no soft shadows, pure brutalism */
```

## Minimalist Mono (Black & White + Accent)

```css
--primary: #000000        /* Black */
--accent: #FF0000         /* Red (or any bold color) */

--background: #FFFFFF
--surface: #F5F5F5
--text: #000000
--text-muted: #666666
--border: #E0E0E0
```

## Nature/Organic (Green/Earth)

```css
--primary: #059669        /* Emerald 600 */
--secondary: #0D9488      /* Teal 600 */
--accent: #F59E0B         /* Amber 500 */

--background: #F0FDF4     /* Green 50 */
--surface: #FFFFFF
--text: #064E3B           /* Emerald 900 */
--text-muted: #047857     /* Emerald 700 */
--border: #A7F3D0         /* Emerald 200 */
```

## Dark Mode Pro (Rich Dark)

```css
--primary: #6366F1        /* Indigo 500 */
--secondary: #EC4899      /* Pink 500 */
--accent: #14B8A6         /* Teal 500 */

--background: #0A0A0A     /* Deep Black */
--surface: #1A1A1A        /* Dark Gray */
--text: #FAFAFA           /* Off White */
--text-muted: #A3A3A3     /* Gray 400 */
--border: #262626         /* Gray 800 */
```

## Contrast Checking

Always verify color combinations meet WCAG standards:

### AA Standard (Minimum)
- Normal text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

### AAA Standard (Enhanced)
- Normal text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio

Use tools like:
- WebAIM Contrast Checker
- Coolors Contrast Checker
- Chrome DevTools Accessibility Panel

## Usage in Tailwind

To use these palettes in your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
          light: '#38BDF8',
        },
        // ... more colors
      }
    }
  }
}
```

## CSS Variables Approach

```css
:root {
  --color-primary: 14 165 233; /* RGB values */
  --color-secondary: 139 92 246;
}

.element {
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-secondary) / 0.8); /* with opacity */
}
```
