'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({
  defaultValue,
  children,
  onValueChange,
}: TabsProps) => (
  <RadixTabs.Root defaultValue={defaultValue} onValueChange={onValueChange}>
    {children}
  </RadixTabs.Root>
);

export const TabsList = ({ children, className }: TabsListProps) => (
  <RadixTabs.List
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-lg bg-slate-100 p-1',
      className
    )}
  >
    {children}
  </RadixTabs.List>
);

export const TabsTrigger = ({
  value,
  children,
  disabled,
}: TabsTriggerProps) => (
  <RadixTabs.Trigger
    value={value}
    disabled={disabled}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
      'transition-all duration-200 focus-visible:outline-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm',
      'data-[state=inactive]:text-slate-600 hover:text-slate-900'
    )}
  >
    {children}
  </RadixTabs.Trigger>
);

export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => (
  <RadixTabs.Content value={value} asChild>
    <motion.div
      className={cn('mt-4', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  </RadixTabs.Content>
);
