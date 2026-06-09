'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className, hover = true }: CardProps) => (
  <motion.div
    className={cn(
      'rounded-lg border border-slate-200 bg-white p-6 shadow-sm',
      hover && 'hover:shadow-lg transition-shadow duration-200',
      className
    )}
    whileHover={hover ? { y: -2 } : undefined}
    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
  >
    {children}
  </motion.div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-bold text-slate-900">{children}</h3>
);

export const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-slate-600 mt-1">{children}</p>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 flex gap-2 justify-end">{children}</div>
);
