'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './Card';
import { ToastContainer } from './Toast';
import { submitContactForm } from '@/app/actions';
import { ContactFormData } from '@/lib/schemas';

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>
  >([]);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    subject: 'General',
  });

  const addToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await submitContactForm(formData);

    if (result.success) {
      addToast(result.message, 'success');
      setFormData({
        name: '',
        email: '',
        message: '',
        subject: 'General',
      });
    } else {
      addToast(result.message, 'error');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Send us a message using server actions and Zod validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Select
              label="Subject"
              value={formData.subject}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  subject: value as ContactFormData['subject'],
                })
              }
            >
              <div />
            </Select>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-md border-2 border-slate-200 bg-white px-3 py-2 text-base transition-all placeholder:text-slate-400 focus-visible:border-primary focus-visible:outline-none resize-none"
                rows={4}
                required
              />
            </div>
            <CardFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className={isLoading ? 'opacity-70' : ''}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};
