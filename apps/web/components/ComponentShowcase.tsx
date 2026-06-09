'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './DropdownMenu';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from './Dialog';
import { Tooltip } from './Tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { Select } from './Select';
import {
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

export const ComponentShowcase = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6"
      >
        {/* Buttons */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>All button variants with animations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inputs */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Text input with label and error states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Normal Input" placeholder="Enter text..." />
              <Input
                label="With Error"
                placeholder="This field has an error"
                error="This is an error message"
              />
              <Input label="Disabled" disabled value="Disabled input" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Dialog */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Animated modal with server actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent
                  title="Welcome"
                  description="This is an animated dialog built with Radix UI"
                >
                  <div className="space-y-4">
                    <p>
                      This dialog demonstrates Framer Motion animations integrated
                      with Radix UI primitives for smooth, accessible interactions.
                    </p>
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button>Confirm</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dropdown Menu */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Dropdown Menu</CardTitle>
              <CardDescription>
                Animated menu with Radix UI and Framer Motion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <DotsHorizontalIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Animated tab navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1">
                <TabsList className="w-full">
                  <TabsTrigger value="tab1" className="flex-1">
                    React
                  </TabsTrigger>
                  <TabsTrigger value="tab2" className="flex-1">
                    Next.js
                  </TabsTrigger>
                  <TabsTrigger value="tab3" className="flex-1">
                    TypeScript
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <p className="text-slate-600">
                    React is a JavaScript library for building user interfaces
                    with components.
                  </p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p className="text-slate-600">
                    Next.js is a React framework with server-side rendering,
                    static generation, and API routes.
                  </p>
                </TabsContent>
                <TabsContent value="tab3">
                  <p className="text-slate-600">
                    TypeScript adds static type checking to JavaScript for safer,
                    more maintainable code.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Select */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Radix UI Select with Framer Motion</CardDescription>
            </CardHeader>
            <CardContent>
              <Select label="Choose an option" defaultValue="">
                <div />
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tooltips */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Tooltips</CardTitle>
              <CardDescription>Animated tooltips on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Tooltip content="This is helpful information" side="top">
                  <Button variant="outline" size="icon">
                    <QuestionMarkCircledIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
                <Tooltip content="Right tooltip" side="right">
                  <Button variant="outline">Hover me</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" side="bottom">
                  <Button variant="outline">Info</Button>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accessibility Features */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
              <CardDescription>WCAG 2.1 AA compliant components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <motion.div
                  className="flex items-start gap-2"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-green-600">✓</span>
                  <p>
                    <strong>Focus Management:</strong> All interactive elements are
                    keyboard accessible with visible focus indicators
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-start gap-2"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-green-600">✓</span>
                  <p>
                    <strong>ARIA Labels:</strong> Proper ARIA attributes for screen
                    readers
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-start gap-2"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-green-600">✓</span>
                  <p>
                    <strong>Color Contrast:</strong> WCAG AA minimum contrast ratios
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-start gap-2"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-green-600">✓</span>
                  <p>
                    <strong>Keyboard Navigation:</strong> Arrow keys, Tab, Enter, and
                    Escape support
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-start gap-2"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-green-600">✓</span>
                  <p>
                    <strong>Reduced Motion:</strong> Respects prefers-reduced-motion
                    media query
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
