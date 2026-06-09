'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DialogContentProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const Dialog = ({
  open,
  onOpenChange,
  children,
}: DialogProps) => (
  <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </RadixDialog.Root>
);

export const DialogTrigger = ({
  children,
  asChild,
}: DialogTriggerProps) => (
  <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>
);

export const DialogContent = ({
  children,
  title,
  description,
  className,
}: DialogContentProps) => (
  <RadixDialog.Portal>
    <AnimatePresence>
      <RadixDialog.Overlay asChild key="overlay">
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </RadixDialog.Overlay>
      <RadixDialog.Content asChild key="content">
        <motion.div
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'w-full max-w-md rounded-lg bg-white shadow-xl p-6',
            className
          )}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {title && (
            <RadixDialog.Title className="text-xl font-bold text-slate-900 mb-2">
              {title}
            </RadixDialog.Title>
          )}
          {description && (
            <RadixDialog.Description className="text-slate-600 mb-4">
              {description}
            </RadixDialog.Description>
          )}
          {children}
        </motion.div>
      </RadixDialog.Content>
    </AnimatePresence>
  </RadixDialog.Portal>
);

export const DialogClose = RadixDialog.Close;
