# Development Setup Guide

## Prerequisites

- Node.js 18+ 
- npm 9+ or yarn 3.6+
- macOS, Linux, or Windows (WSL2)

## Installation Steps

### 1. Clone/Navigate to Project

```bash
cd /Users/sahil/Desktop/testcop
```

### 2. Install Root Dependencies

```bash
npm install
```

This installs:
- Turbo (monorepo orchestration)
- TypeScript (root-level config)
- Prettier (code formatting)
- ESLint (linting)

### 3. Install App Dependencies

```bash
cd apps/web
npm install
```

This installs:
- Next.js 15
- React 19
- Radix UI primitives
- Tailwind CSS
- Framer Motion
- Zod
- TypeScript packages

## Running the Application

### Development Mode

From the root directory:
```bash
npm run dev
```

This starts:
- Turbo dev server
- Next.js on `http://localhost:3000`
- Fast refresh enabled
- Type checking active

### Production Build

```bash
npm run build
```

Then run:
```bash
npm start
```

## Project Commands

### From Root Directory

```bash
# Start development server (all packages)
npm run dev

# Build all packages
npm run build

# Run linters
npm run lint

# Format code
npm run format
```

### From apps/web Directory

```bash
# Dev server
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## File Structure

```
apps/web/
├── app/
│   ├── actions.ts          # Server actions
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── favicon.ico
├── components/
│   ├── index.ts            # Exports all components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Dialog.tsx          # Radix Dialog
│   ├── DropdownMenu.tsx    # Radix Dropdown
│   ├── Tabs.tsx            # Radix Tabs
│   ├── Select.tsx          # Radix Select
│   ├── Tooltip.tsx         # Radix Tooltip
│   ├── Toast.tsx
│   ├── ContactForm.tsx     # Form with server actions
│   ├── TaskManager.tsx     # Complex form example
│   └── ComponentShowcase.tsx
├── lib/
│   ├── schemas.ts          # Zod schemas
│   └── utils.ts            # Helper functions
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── tsconfig.json
```

## Key Configuration Files

### Next.js Config (`next.config.js`)
- Enables server actions
- React strict mode
- TypeScript strict null checks

### Tailwind Config (`tailwind.config.js`)
- Custom colors (primary, secondary, accent)
- Animation definitions
- Responsive utilities

### TypeScript Config (`tsconfig.json`)
- Strict mode enabled
- Path aliases (@/*)
- ES2020 target

## Environment Variables

No environment variables required for basic development.

Optional for production:
```bash
# .env.local
NEXT_PUBLIC_API_URL=
```

## Development Workflow

### Adding a New Component

1. Create component file in `components/`
2. Export from `components/index.ts`
3. Use in pages or other components
4. Ensure TypeScript types are defined
5. Include accessibility features

### Creating a Server Action

1. Add validation schema in `lib/schemas.ts` (Zod)
2. Create action in `app/actions.ts` with `'use server'`
3. Import and call from client components
4. Handle success/error responses
5. Update UI with toast notifications

### Styling Components

1. Use Tailwind classes for responsive design
2. Use CVA (Class Variance Authority) for component variants
3. Use `cn()` utility from `lib/utils.ts` to merge classes
4. Prefer motion for interactive states
5. Test color contrast (WCAG AA: 4.5:1 text, 3:1 UI)

## Debugging

### Browser DevTools
- React DevTools for component inspection
- Network tab for server actions
- Console for errors

### VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Thunder Client or REST Client (for API testing)

### Terminal Debugging

```bash
# Enable verbose mode
DEBUG=* npm run dev

# Check types
npm run typecheck

# Lint check
npm run lint
```

## Troubleshooting

### Issue: Module not found errors

**Solution**: Run `npm install` in both root and `apps/web`

### Issue: Tailwind classes not applying

**Solution**: Ensure class names are complete (no string concatenation)

### Issue: Server action not working

**Solution**: 
1. Add `'use server'` at top of file
2. Check Zod schema validation
3. Ensure Next.js version is 15+

### Issue: Components not rendering

**Solution**:
1. Check `'use client'` directive at component top
2. Verify imports from `components/index.ts`
3. Look for console errors

## Performance Tips

1. **Code Splitting**: Use dynamic imports for heavy components
2. **Image Optimization**: Use Next.js Image component
3. **Bundle Analysis**: Use `npm run build` to analyze
4. **Caching**: Server actions cache-friendly
5. **CSS**: Tailwind purges unused classes

## Accessibility Testing

1. **Keyboard Navigation**: Tab through all interactive elements
2. **Screen Readers**: Test with NVDA (Windows) or VoiceOver (Mac)
3. **Color Contrast**: Use WebAIM Contrast Checker
4. **ARIA Labels**: Check DevTools accessibility tree
5. **Motion**: Test with `prefers-reduced-motion`

## Next Steps

1. Explore `ComponentShowcase` page to see all components
2. Try the `ContactForm` to test server actions
3. Create a new component using the existing patterns
4. Add a database connection (Prisma/Supabase)
5. Deploy to Vercel

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Radix UI Docs](https://radix-ui.com)
- [Tailwind Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://framer.com/motion)
- [Zod Docs](https://zod.dev)

---

Need help? Check the README.md for more information!
