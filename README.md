# Radix UI + Next.js 15 - Full Stack Example

A comprehensive turbo monorepo demonstrating production-ready Radix UI components with Next.js 15 server actions, TypeScript, Zod validation, Tailwind CSS, and Framer Motion micro-animations.

## 🎯 Project Structure

```
testcop/
├── apps/web/                    # Next.js 15 main application
│   ├── app/
│   │   ├── actions.ts           # Server actions with Zod validation
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main page with all demos
│   │   └── globals.css          # Global styles + Tailwind
│   ├── components/              # UI Components
│   │   ├── Button.tsx           # shadcn-styled button
│   │   ├── Input.tsx            # Input component
│   │   ├── Card.tsx             # Card layout
│   │   ├── Dialog.tsx           # Radix Dialog with animations
│   │   ├── DropdownMenu.tsx     # Radix Dropdown with animations
│   │   ├── Tabs.tsx             # Radix Tabs with animations
│   │   ├── Select.tsx           # Radix Select with animations
│   │   ├── Tooltip.tsx          # Radix Tooltip
│   │   ├── Toast.tsx            # Toast notifications
│   │   ├── ContactForm.tsx      # Server action example
│   │   ├── TaskManager.tsx      # Complex form example
│   │   ├── ComponentShowcase.tsx # All components demo
│   │   └── index.ts             # Component exports
│   ├── lib/
│   │   ├── schemas.ts           # Zod validation schemas
│   │   └── utils.ts             # Utility functions
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── next.config.js
│   └── tsconfig.json
├── package.json                 # Root workspace config
├── turbo.json                   # Turbo build config
└── tsconfig.json                # Root TypeScript config
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
cd /Users/sahil/Desktop/testcop

# Install dependencies (from root)
npm install

# Install in Next.js app
cd apps/web
npm install
```

### Development

```bash
# From root directory - starts turbo dev
npm run dev

# Or from apps/web for single app
cd apps/web
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build

```bash
npm run build
```

## 📦 Key Technologies

### Frontend Framework
- **Next.js 15** - React framework with server actions
- **React 19** - Latest React with improved hooks
- **TypeScript** - Static type safety

### UI & Components
- **Radix UI** - Headless component primitives
- **Tailwind CSS 3** - Utility-first CSS framework
- **shadcn/ui patterns** - Component customization patterns
- **Class Variance Authority** - Variant management

### Animations & Effects
- **Framer Motion 10** - Micro-animations library
- **Tailwind animations** - CSS-based animations

### Form & Validation
- **Zod** - Schema validation library
- **React Hook Form** - Ready to integrate

### Development
- **Turbo** - Monorepo build system
- **TypeScript** - Type-safe development

## 🎨 Component Features

### Radix UI Primitives Implemented

#### Dialog (Modal)
- Keyboard navigation (Escape to close)
- Focus trap and restoration
- Animated with Framer Motion
- Accessible overlay
- See: `components/Dialog.tsx`

#### Dropdown Menu
- Arrow key navigation
- Type-ahead search ready
- Animated transitions
- Nested submenu support
- See: `components/DropdownMenu.tsx`

#### Tabs
- Keyboard navigation (Arrow keys)
- Smooth content transitions
- Accessible ARIA labels
- See: `components/Tabs.tsx`

#### Select
- Keyboard navigation
- Animated dropdown
- Accessible value selection
- Icon support
- See: `components/Select.tsx`

#### Tooltip
- Auto positioning
- Directional control
- Accessible triggers
- Micro-animations
- See: `components/Tooltip.tsx`

### Custom Components

#### Button
- Multiple variants (default, secondary, outline, ghost, destructive)
- Responsive sizes (sm, md, lg, icon)
- Disabled states
- Focus visible styles

#### Input
- Label support
- Error display
- Disabled state
- Focus indicators

#### Card
- Hover animations
- Composed layout pattern
- Shadow transitions

#### Toast
- Success/Error/Info types
- Auto-dismiss
- Stacked layout
- Smooth animations

## ✅ Accessibility Features

All components implement **WCAG 2.1 AA** standards:

### Focus Management
- ✓ Visible focus indicators on all interactive elements
- ✓ Focus trap in modals
- ✓ Focus restoration on close
- ✓ Logical tab order

### Keyboard Navigation
- ✓ Full keyboard support (Tab, Arrow keys, Enter, Escape)
- ✓ Type-ahead in dropdowns/select
- ✓ Escape key closes modals
- ✓ Space/Enter to activate buttons

### ARIA Labels
- ✓ Proper ARIA roles and attributes
- ✓ aria-label for icon buttons
- ✓ aria-labelledby for dialogs
- ✓ aria-describedby for error messages
- ✓ aria-invalid for error states

### Color Contrast
- ✓ WCAG AA minimum (4.5:1 for text, 3:1 for UI)
- ✓ Multiple color schemes tested
- ✓ No color-only information conveyance

### Error States
- ✓ Clear error messages
- ✓ aria-invalid attribute
- ✓ aria-describedby links to error text
- ✓ Error styling distinct from normal state

### Reduced Motion
- ✓ Respects `prefers-reduced-motion` media query
- ✓ Animations disabled for users who prefer reduced motion
- ✓ See `globals.css` for implementation

## 🔧 Server Actions Examples

### Contact Form Submission

```typescript
// In app/actions.ts
export async function submitContactForm(data: unknown) {
  const validatedData = contactFormSchema.parse(data);
  // Process validated data
  return { success: true, message: 'Submitted!' };
}

// In components/ContactForm.tsx
const result = await submitContactForm(formData);
```

### Task Creation

```typescript
export async function createTask(data: unknown) {
  const validatedData = taskSchema.parse(data);
  // Create task
  return { success: true, taskId: 'task-123' };
}
```

### Validation with Zod

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.enum(['General', 'Support', 'Feedback', 'Bug Report']),
});
```

## 🎬 Micro-Animations

Components feature Framer Motion animations:

### Dialog
- Smooth fade-in overlay
- Spring-based content scale and position
- Proper open/close transitions

### Dropdown Menu
- Scale and fade entrance
- Rapid animation timing
- Exit animation on close

### Tabs
- Content fade and slide transition
- Instant tab indicator change
- Smooth content swap

### Cards
- Hover lift effect (y translation)
- Shadow enhancement on hover
- Spring physics for natural feel

### Toast Notifications
- Slide up entrance from bottom
- Auto-dismiss with fade exit
- Multiple toasts stack elegantly

## 📝 Zod Schemas

Defined in `lib/schemas.ts`:

```typescript
// Contact form validation
contactFormSchema: z.object({
  name, email, message, subject
})

// Task management validation
taskSchema: z.object({
  title, description, priority, status
})

// Newsletter subscription
subscribeSchema: z.object({
  email, frequency
})
```

## 🎯 Accessibility Checklist

Reference the [Radix UI Design System Skill](/.github/skills/radix-ui-design-system/SKILL.md) for complete accessibility guidelines.

### Component-Level Checklist

#### Dialog-Specific
- [x] Dialog.Title is present (required for screen readers)
- [x] Dialog.Description provides context
- [x] Focus trapped inside modal when open
- [x] Escape key closes dialog
- [x] Focus returns to trigger on close

#### Dropdown-Specific
- [x] Arrow keys navigate items
- [x] Type-ahead search capability
- [x] First/last item wrapping behavior
- [x] Selected state indicated visually and with ARIA

#### Every Component Must Have
- [x] Focus Management: Visible focus indicators
- [x] Keyboard Navigation: Full keyboard support
- [x] ARIA Labels: Meaningful screen reader text
- [x] Color Contrast: WCAG AA minimum
- [x] Error States: Clear error messages
- [x] Loading States: aria-busy during async

## 🚢 Deployment

### Vercel (Recommended for Next.js)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY apps/web ./apps/web
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 📚 Resources

### Documentation
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod](https://zod.dev)

### Related Skills
- Radix UI Design System - Component patterns and theming
- Tailwind CSS Design System - CSS utility patterns
- React Patterns - Composition patterns
- Accessibility Compliance - WCAG testing

## 🎓 Learning Outcomes

After exploring this project, you'll understand:

1. ✓ How to structure a Next.js 15 application with server actions
2. ✓ Building accessible components with Radix UI primitives
3. ✓ Type-safe form validation with Zod
4. ✓ Creating delightful micro-animations with Framer Motion
5. ✓ Styling with Tailwind CSS and shadcn patterns
6. ✓ WCAG 2.1 AA accessibility compliance
7. ✓ Monorepo structure with Turbo
8. ✓ Server-side form handling and validation

## 📄 License

MIT

## 🤝 Contributing

Feel free to fork and submit pull requests!

---

**Built with Radix UI + Next.js 15** 🚀
