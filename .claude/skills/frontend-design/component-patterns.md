# Frontend Component Design Patterns

## Button Patterns

### Primary Button
```jsx
<button className="
  px-6 py-3
  bg-primary text-white
  font-semibold
  border-2 border-transparent
  transition-all duration-200
  hover:bg-primary-dark hover:shadow-lg
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Primary Action
</button>
```

### Secondary Button
```jsx
<button className="
  px-6 py-3
  bg-transparent text-primary
  font-semibold
  border-2 border-primary
  transition-all duration-200
  hover:bg-primary hover:text-white
  active:scale-95
">
  Secondary Action
</button>
```

### Ghost Button
```jsx
<button className="
  px-6 py-3
  bg-transparent text-foreground
  font-semibold
  border-2 border-transparent
  transition-all duration-200
  hover:bg-muted
  active:scale-95
">
  Tertiary Action
</button>
```

## Card Patterns

### Basic Card
```jsx
<div className="
  bg-white
  border border-border
  rounded-lg
  p-6
  shadow-sm
  hover:shadow-md
  transition-shadow duration-200
">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</div>
```

### Interactive Card (Clickable)
```jsx
<button className="
  w-full text-left
  bg-white
  border-2 border-border
  rounded-lg
  p-6
  shadow-sm
  transition-all duration-200
  hover:border-primary hover:shadow-lg hover:-translate-y-1
  active:translate-y-0
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
">
  {/* Card content */}
</button>
```

### Card with Image
```jsx
<div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
  <img
    src="/image.jpg"
    alt="Description"
    className="w-full h-48 object-cover"
  />
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">Card Title</h3>
    <p className="text-muted-foreground mb-4">Description text</p>
    <button className="text-primary font-semibold hover:underline">
      Read More →
    </button>
  </div>
</div>
```

## Form Patterns

### Input Field
```jsx
<div className="space-y-2">
  <label
    htmlFor="email"
    className="block text-sm font-medium text-foreground"
  >
    Email Address
  </label>
  <input
    id="email"
    type="email"
    className="
      w-full px-4 py-2
      bg-white
      border-2 border-border
      rounded-md
      text-foreground
      placeholder:text-muted-foreground
      transition-colors duration-200
      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
      disabled:opacity-50 disabled:cursor-not-allowed
    "
    placeholder="you@example.com"
  />
</div>
```

### Input with Error
```jsx
<div className="space-y-2">
  <label htmlFor="password" className="block text-sm font-medium text-foreground">
    Password
  </label>
  <input
    id="password"
    type="password"
    className="
      w-full px-4 py-2
      bg-white
      border-2 border-error
      rounded-md
      focus:outline-none focus:ring-2 focus:ring-error/20
    "
  />
  <p className="text-sm text-error flex items-center gap-1">
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
    </svg>
    Password must be at least 8 characters
  </p>
</div>
```

### Select Dropdown
```jsx
<div className="space-y-2">
  <label htmlFor="country" className="block text-sm font-medium text-foreground">
    Country
  </label>
  <select
    id="country"
    className="
      w-full px-4 py-2
      bg-white
      border-2 border-border
      rounded-md
      text-foreground
      transition-colors duration-200
      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
      cursor-pointer
    "
  >
    <option>United States</option>
    <option>Canada</option>
    <option>United Kingdom</option>
  </select>
</div>
```

## Navigation Patterns

### Top Navigation
```jsx
<nav className="bg-white border-b border-border">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">Logo</span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
          Home
        </a>
        <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
          About
        </a>
        <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
          Contact
        </a>
      </div>

      {/* CTA */}
      <button className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-dark transition-colors">
        Get Started
      </button>
    </div>
  </div>
</nav>
```

### Sidebar Navigation
```jsx
<aside className="w-64 bg-white border-r border-border min-h-screen p-4">
  <div className="space-y-1">
    <a
      href="#"
      className="
        flex items-center gap-3 px-4 py-3
        bg-primary/10 text-primary
        rounded-md
        font-medium
      "
    >
      <HomeIcon className="w-5 h-5" />
      Dashboard
    </a>
    <a
      href="#"
      className="
        flex items-center gap-3 px-4 py-3
        text-foreground
        rounded-md
        font-medium
        hover:bg-muted
        transition-colors
      "
    >
      <SettingsIcon className="w-5 h-5" />
      Settings
    </a>
  </div>
</aside>
```

## Modal/Dialog Patterns

### Basic Modal
```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  {/* Backdrop */}
  <div
    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
    onClick={closeModal}
  />

  {/* Modal */}
  <div className="
    relative
    bg-white
    rounded-lg
    shadow-xl
    max-w-md w-full
    p-6
  ">
    <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
    <p className="text-muted-foreground mb-6">
      Modal content goes here
    </p>
    <div className="flex gap-3 justify-end">
      <button
        onClick={closeModal}
        className="px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
      >
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
        Confirm
      </button>
    </div>
  </div>
</div>
```

## Badge/Tag Patterns

### Status Badges
```jsx
{/* Success */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Active
</span>

{/* Warning */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
  Pending
</span>

{/* Error */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  Inactive
</span>
```

## Loading States

### Skeleton Loader
```jsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-muted rounded w-3/4"></div>
  <div className="h-4 bg-muted rounded w-1/2"></div>
  <div className="h-4 bg-muted rounded w-5/6"></div>
</div>
```

### Spinner
```jsx
<div className="animate-spin rounded-full h-8 w-8 border-4 border-muted border-t-primary"></div>
```

## Responsive Grid Patterns

### Product Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map(product => (
    <div key={product.id} className="bg-white border border-border rounded-lg overflow-hidden">
      {/* Product card content */}
    </div>
  ))}
</div>
```

### Dashboard Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white border border-border rounded-lg p-6">
    {/* Stat card */}
  </div>
</div>
```

## Animation Classes (Tailwind)

```css
/* Add to your CSS or Tailwind config */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

Usage:
```jsx
<div className="animate-[fadeIn_0.3s_ease-in]">
  Content fades in
</div>
```
