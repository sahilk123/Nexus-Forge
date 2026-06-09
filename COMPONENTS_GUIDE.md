# Adding New Components Guide

This guide shows how to add new components following the patterns established in this project.

## Component Template

### 1. Create Component File

Create `components/YourComponent.tsx`:

```tsx
'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const yourComponentVariants = cva(
  // Base styles
  'base-classes here',
  {
    variants: {
      variant: {
        default: 'variant-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface YourComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof yourComponentVariants> {
  // Add custom props here
}

export const YourComponent = forwardRef<HTMLDivElement, YourComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(yourComponentVariants({ variant, size, className }))}
      {...props}
    />
  )
);

YourComponent.displayName = 'YourComponent';
```

### 2. Export from Index

Add to `components/index.ts`:

```tsx
export { YourComponent, type YourComponentProps } from './YourComponent';
```

### 3. Use in Pages/Components

```tsx
import { YourComponent } from '@/components';

export default function Page() {
  return (
    <YourComponent variant="secondary" size="lg">
      Content here
    </YourComponent>
  );
}
```

---

## Pattern: Radix UI Component Wrapper

When wrapping Radix UI primitives with animations:

```tsx
'use client';

import * as RadixComponent from '@radix-ui/react-component';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const MyComponent = ({ children, ...props }) => (
  <RadixComponent.Root {...props}>
    {children}
  </RadixComponent.Root>
);

export const MyComponentContent = ({ children, className }) => (
  <RadixComponent.Portal>
    <RadixComponent.Content asChild>
      <motion.div
        className={cn('base-styles', className)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </RadixComponent.Content>
  </RadixComponent.Portal>
);
```

**Key Points:**
- Use `'use client'` for interactive components
- Use `asChild` prop to avoid wrapper divs
- Use `forceMount` with Framer Motion for animations
- Compose with motion primitives

---

## Pattern: Form Component with Server Actions

Create `components/MyForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { ToastContainer } from './Toast';
import { myAction } from '@/app/actions';
import { MyFormData } from '@/lib/schemas';

export const MyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const result = await myAction(data);

    if (result.success) {
      addToast(result.message, 'success');
      e.currentTarget.reset();
    } else {
      addToast(result.message, 'error');
    }

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="field1"
          label="Label"
          placeholder="Placeholder"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};
```

---

## Pattern: Server Action with Zod

Add to `lib/schemas.ts`:

```tsx
import { z } from 'zod';

export const myFormSchema = z.object({
  field1: z.string().min(1, 'Required'),
  field2: z.string().email('Invalid email'),
});

export type MyFormData = z.infer<typeof myFormSchema>;
```

Add to `app/actions.ts`:

```tsx
'use server';

import { myFormSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function myAction(
  data: unknown
): Promise<{ success: boolean; message: string }> {
  try {
    const validatedData = myFormSchema.parse(data);
    
    // Do something with data
    console.log(validatedData);
    
    return {
      success: true,
      message: 'Success message',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Validation error: ${error.errors[0].message}`,
      };
    }

    return {
      success: false,
      message: 'An error occurred',
    };
  }
}
```

---

## Accessibility Checklist for New Components

Before completing a component, ensure:

### Focus Management
- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive elements
- [ ] Tab order is logical
- [ ] No focus traps (except intentional modals)

### ARIA Labels
- [ ] Buttons have text or `aria-label`
- [ ] Form fields have labels
- [ ] Landmarks have labels if needed
- [ ] Live regions have appropriate `aria-live`

### Color Contrast
- [ ] Text meets 4.5:1 ratio (AA)
- [ ] UI elements meet 3:1 ratio (AA)
- [ ] Information not conveyed by color alone

### Keyboard Shortcuts
- [ ] All functions accessible via keyboard
- [ ] Escape closes modals
- [ ] Arrow keys navigate lists
- [ ] Enter activates buttons

### Testing
- [ ] Works with Tab key navigation
- [ ] Works with screen reader
- [ ] Passes axe DevTools audit
- [ ] Respects `prefers-reduced-motion`

---

## Animation Best Practices

Use Framer Motion for micro-interactions:

```tsx
import { motion } from 'framer-motion';

// Spring animations (natural feel)
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
>
  Content
</motion.div>

// Entrance stagger
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Hover effect
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click me
</motion.button>

// Respect user preference
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}
```

---

## Styling Best Practices

### Use CVA for Variants

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
      },
      size: {
        small: 'px-3 py-1 text-sm',
        large: 'px-6 py-3 text-lg',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'large',
        className: 'text-lg font-bold',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'small',
    },
  }
);
```

### Use `cn()` to Merge Classes

```tsx
import { cn } from '@/lib/utils';

// Prevents Tailwind conflicts
const finalClass = cn(
  'px-4 py-2',
  isActive && 'bg-blue-500',
  customClass // Can override base styles
);
```

---

## Common Component Patterns

### Controlled Input

```tsx
const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Uncontrolled Input

```tsx
const inputRef = useRef<HTMLInputElement>(null);

// Access value when needed
const value = inputRef.current?.value;

<Input ref={inputRef} />
```

### Compound Components

```tsx
// Allow composition while managing state
<MyComponent>
  <MyComponent.Header>Title</MyComponent.Header>
  <MyComponent.Body>Content</MyComponent.Body>
  <MyComponent.Footer>Actions</MyComponent.Footer>
</MyComponent>
```

---

## Testing Components

### Unit Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent>Test</YourComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('supports variants', () => {
    render(<YourComponent variant="secondary">Test</YourComponent>);
    expect(screen.getByText('Test')).toHaveClass('secondary-class');
  });

  it('is keyboard accessible', () => {
    render(<YourComponent>Button</YourComponent>);
    const element = screen.getByText('Button');
    element.focus();
    expect(element).toHaveFocus();
  });
});
```

---

## Documentation Template

Add to your component file:

```tsx
/**
 * YourComponent - A reusable component that does X
 *
 * @example
 * ```tsx
 * <YourComponent variant="primary" size="large">
 *   Click me
 * </YourComponent>
 * ```
 *
 * @accessibility
 * - Keyboard navigable with Tab
 * - Arrow keys for navigation
 * - Escape to close
 * - ARIA labels on all interactions
 */
```

---

## Component Organization

When adding multiple related components:

```
components/
├── Badge/
│   ├── Badge.tsx
│   ├── Badge.test.tsx
│   └── Badge.stories.tsx (if using Storybook)
├── Card/
│   ├── Card.tsx
│   ├── CardHeader.tsx
│   ├── CardContent.tsx
│   ├── CardFooter.tsx
│   ├── index.ts
│   └── Card.test.tsx
```

---

## Quick Checklist for New Components

- [ ] Created `.tsx` file in `components/` directory
- [ ] Exported from `components/index.ts`
- [ ] Used `'use client'` directive if interactive
- [ ] Added TypeScript types
- [ ] Implemented responsive design
- [ ] Added focus styles
- [ ] Tested keyboard navigation
- [ ] Added JSDoc comments
- [ ] Followed naming conventions
- [ ] Respects `prefers-reduced-motion`
- [ ] Accessible color contrast
- [ ] Tested with screen reader

---

## Resources

- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Documentation](https://radix-ui.com/primitives)
- [CVA Documentation](https://cva.style/docs)
- [Framer Motion Docs](https://framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)

---

**Start with these patterns and adapt to your specific needs!**
