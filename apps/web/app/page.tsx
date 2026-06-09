'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ComponentShowcase,
  ContactForm,
  TaskManager,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components';

export default function Home() {
  const [activeTab, setActiveTab] = useState('showcase');

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.header
        className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Radix UI + Next.js 15
              </h1>
              <p className="text-slate-600 mt-1">
                Server Actions • TypeScript • Zod • Tailwind • Framer Motion
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Tab Navigation */}
          <motion.div variants={item}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-white border border-slate-200">
                <TabsTrigger value="showcase" className="flex-1">
                  Component Showcase
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex-1">
                  Contact Form
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1">
                  Task Manager
                </TabsTrigger>
              </TabsList>

              <TabsContent value="showcase" className="mt-8">
                <ComponentShowcase />
              </TabsContent>

              <TabsContent value="contact" className="mt-8">
                <ContactForm />
              </TabsContent>

              <TabsContent value="tasks" className="mt-8">
                <TaskManager />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Features Section */}
          <motion.div variants={item}>
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Server Actions',
                    description:
                      'Next.js 15 server actions with Zod validation',
                  },
                  {
                    title: 'Radix UI Primitives',
                    description: 'Accessible, unstyled component primitives',
                  },
                  {
                    title: 'TypeScript',
                    description: 'Full type safety across the application',
                  },
                  {
                    title: 'Tailwind CSS',
                    description: 'Utility-first CSS framework for styling',
                  },
                  {
                    title: 'Framer Motion',
                    description: 'Micro-animations for delightful UX',
                  },
                  {
                    title: 'Accessibility',
                    description: 'WCAG 2.1 AA compliant components',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  >
                    <h3 className="font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div variants={item}>
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Frontend</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• React 19 with Server Components</li>
                    <li>• Next.js 15 App Router</li>
                    <li>• Tailwind CSS 3</li>
                    <li>• Framer Motion 10</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Backend & Validation</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Next.js Server Actions</li>
                    <li>• Zod for runtime validation</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Radix UI primitives</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            variants={item}
            className="text-center py-8 border-t border-slate-200"
          >
            <p className="text-slate-600">
              Built with Radix UI, Next.js 15, and Framer Motion
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://radix-ui.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-600 transition-colors"
              >
                Radix UI Docs
              </a>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-600 transition-colors"
              >
                Next.js Docs
              </a>
              <a
                href="https://www.framer.com/motion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-600 transition-colors"
              >
                Framer Motion
              </a>
            </div>
          </motion.footer>
        </motion.div>
      </main>
    </div>
  );
}
