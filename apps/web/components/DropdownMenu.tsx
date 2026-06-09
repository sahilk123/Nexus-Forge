'use client';

import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const DropdownMenu = ({ children }: DropdownMenuProps) => (
  <RadixDropdown.Root>{children}</RadixDropdown.Root>
);

export const DropdownMenuTrigger = ({
  children,
  asChild,
}: DropdownMenuTriggerProps) => (
  <RadixDropdown.Trigger asChild={asChild}>{children}</RadixDropdown.Trigger>
);

export const DropdownMenuContent = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content asChild>
      <motion.div
        className="min-w-[200px] rounded-lg bg-white shadow-lg border border-slate-200 py-1 z-50"
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </RadixDropdown.Content>
  </RadixDropdown.Portal>
);

export const DropdownMenuItem = ({
  children,
  onClick,
  disabled,
  className,
}: DropdownMenuItemProps) => (
  <RadixDropdown.Item
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'px-4 py-2 text-sm text-slate-700 cursor-pointer transition-colors',
      'hover:bg-slate-100 focus:outline-none focus:bg-slate-100',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
  >
    {children}
  </RadixDropdown.Item>
);

export const DropdownMenuSeparator = () => (
  <RadixDropdown.Separator className="my-1 h-px bg-slate-200" />
);
