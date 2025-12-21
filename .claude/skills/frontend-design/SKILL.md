---
name: frontend-design
description: Design and implement high-quality, visually distinctive user interfaces with modern design patterns, color palettes, typography, and micro-interactions. Use when creating frontend components, designing UI layouts, reviewing design implementations, or enhancing visual appearance of web applications.
---

## Overview

This skill helps create professional, modern frontend designs following current best practices in:
- Color palettes and contrast
- Typography and font selection
- Component layouts and spacing
- Micro-interactions and hover states
- Responsive design patterns
- Accessibility considerations

## Design Principles

When designing frontends, apply these principles:

### Color Palettes
- Use cohesive color schemes (complementary colors, analogous palettes)
- Ensure sufficient contrast for accessibility (WCAG AA standards minimum)
- Define primary, secondary, and accent colors explicitly
- Consider dark mode alternatives

### Typography
- Choose modern sans-serif fonts (Inter, Poppins, or system fonts)
- Define font hierarchy with specific sizing and weights
- Use line-height for readability (1.5-1.6 for body text)
- Limit font families to 2-3 for consistency
- Consider monospace fonts for code/data display

### Layouts and Spacing
- Use card-based layouts with subtle shadows or borders
- Apply consistent spacing scales (8px, 16px, 24px, 32px, 48px)
- Create visual hierarchy through size, color, and whitespace
- Ensure mobile-first responsive design
- Use CSS Grid and Flexbox for modern layouts

### Micro-interactions
- Add hover states to interactive elements
- Include smooth transitions (200-300ms for most animations)
- Provide visual feedback for user actions
- Use subtle animations to guide attention
- Consider loading states and skeleton screens

### Accessibility
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 for large text (18px+)
- Keyboard navigation support
- Screen reader friendly markup
- Focus indicators on interactive elements
- Touch targets minimum 44x44px

## Component Design Standards

### Buttons
```
Primary: Bold background, high contrast text
Secondary: Outlined or subtle background
Ghost: Transparent with hover state
Disabled: Reduced opacity (0.5-0.6)

Sizes:
- Small: padding 8px 16px, text 14px
- Medium: padding 12px 20px, text 16px
- Large: padding 16px 32px, text 18px
```

### Cards
```
Background: White or subtle gray
Border: 1px solid or none
Shadow: Subtle (0 1px 3px rgba(0,0,0,0.1))
Hover: Elevated shadow or border color change
Border radius: 8px-12px
Padding: 16px-24px
```

### Forms
```
Input fields:
- Clear labels above or beside inputs
- Placeholder text in muted color
- Focus state with border/ring highlight
- Error states in red with messages
- Success states in green

Spacing:
- Label to input: 8px
- Between fields: 16px-24px
```

### Typography Scale
```
Display: 48px-64px, weight 700-800
H1: 32px-40px, weight 700
H2: 24px-28px, weight 600
H3: 20px-24px, weight 600
H4: 18px-20px, weight 600
Body: 16px, weight 400
Small: 14px, weight 400
Tiny: 12px, weight 400
```

## Design Systems to Reference

When appropriate, draw inspiration from:
- Tailwind UI - Modern utility-first components
- Shadcn UI - Accessible React components
- Material Design - Google's design system
- Ant Design - Enterprise-level design patterns
- Chakra UI - Accessible component library

## Implementation Guidelines

### For React Projects
- Use Tailwind CSS for utility-first styling
- Implement component variants with class-variance-authority
- Use Radix UI primitives for accessibility
- Apply CSS-in-JS when needed for dynamic styles

### For Responsive Design
- Mobile first: Base styles for mobile, media queries for larger screens
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Test on multiple device sizes
- Consider touch vs mouse interactions

### Animation Best Practices
- Use `transform` and `opacity` for performance
- Avoid animating `width`, `height`, `top`, `left`
- Respect `prefers-reduced-motion` media query
- Keep animations under 300ms for micro-interactions
- Use easing functions: ease-out for entrances, ease-in for exits

## Color Palette Examples

### Modern Tech (Blue/Cyan)
```
Primary: #0EA5E9
Secondary: #8B5CF6
Accent: #10B981
Neutral: #64748B
```

### Warm Professional (Orange/Purple)
```
Primary: #F59E0B
Secondary: #8B5CF6
Accent: #EC4899
Neutral: #6B7280
```

### Brutalist/Retro (Bold Primaries)
```
Primary: #FF006E (Hot Pink)
Secondary: #8338EC (Purple)
Accent: #3A86FF (Blue)
Neutral: #1A1A1A (Near Black)
```

## When to Use This Skill

Invoke this skill when:
- Creating new UI components from scratch
- Redesigning existing interfaces
- Implementing design system changes
- Building landing pages or marketing sites
- Creating dashboards and data visualizations
- Improving accessibility and user experience
- Converting designs to code
- Reviewing and critiquing frontend implementations

## Output Format

When using this skill, provide:
1. **Color palette** - Specific hex codes for the design
2. **Typography choices** - Font families, sizes, and weights
3. **Component structure** - HTML/JSX markup
4. **Styling approach** - Tailwind classes or CSS code
5. **Responsive considerations** - Mobile, tablet, desktop breakpoints
6. **Accessibility notes** - ARIA labels, contrast ratios, keyboard nav
7. **Animation/interaction details** - Transitions and hover states

## Best Practices Checklist

Before completing any design task, verify:
- ✅ Colors meet WCAG AA contrast requirements
- ✅ Typography is readable at all sizes
- ✅ Layout is responsive (mobile, tablet, desktop)
- ✅ Interactive elements have clear hover/focus states
- ✅ Keyboard navigation works properly
- ✅ Touch targets are minimum 44x44px
- ✅ Animations respect reduced motion preference
- ✅ Code is clean and maintainable
- ✅ Design is consistent with existing patterns
- ✅ Loading and error states are handled
