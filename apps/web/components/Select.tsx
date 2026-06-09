'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
  label?: string;
}

interface SelectTriggerProps {
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Select = ({
  value,
  onValueChange,
  children,
  disabled,
  label,
}: SelectProps) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
    )}
    <RadixSelect.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {children}
    </RadixSelect.Root>
  </div>
);

export const SelectTrigger = ({
  placeholder,
  children,
  className,
}: SelectTriggerProps) => (
  <RadixSelect.Trigger
    className={cn(
      'inline-flex h-10 w-full items-center justify-between rounded-md border-2 border-slate-200',
      'bg-white px-3 py-2 text-base transition-all focus-visible:border-primary focus-visible:outline-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
  >
    <RadixSelect.Value placeholder={placeholder} />
    <RadixSelect.Icon className="text-slate-600">
      <ChevronDownIcon />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
);

export const SelectContent = ({ children }: SelectContentProps) => (
  <RadixSelect.Portal>
    <RadixSelect.Content asChild>
      <motion.div
        className="min-w-[200px] overflow-hidden rounded-lg bg-white shadow-lg border border-slate-200 z-50"
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <RadixSelect.Viewport className="p-1">
          {children}
        </RadixSelect.Viewport>
      </motion.div>
    </RadixSelect.Content>
  </RadixSelect.Portal>
);

export const SelectItem = ({
  value,
  children,
  disabled,
}: SelectItemProps) => (
  <RadixSelect.Item
    value={value}
    disabled={disabled}
    className={cn(
      'relative flex items-center pr-8 pl-8 h-10 select-none',
      'text-slate-700 transition-colors cursor-pointer',
      'hover:bg-slate-100 focus:outline-none focus:bg-slate-100',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'data-[state=checked]:bg-primary data-[state=checked]:text-white'
    )}
  >
    <RadixSelect.ItemIndicator className="absolute left-2 inline-flex items-center">
      <CheckIcon className="h-4 w-4" />
    </RadixSelect.ItemIndicator>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
);
