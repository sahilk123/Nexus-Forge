'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { ToastContainer } from './Toast';
import { createTask, updateTask } from '@/app/actions';
import { TaskData } from '@/lib/schemas';
import { motion, AnimatePresence } from 'framer-motion';

interface Task extends TaskData {
  id: string;
  createdAt?: number;
}

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>
  >([]);
  const [formData, setFormData] = useState<TaskData>({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDeleteTask = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setDeletingId(null);
      addToast('Task removed successfully', 'success');
    }, 600);
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    newStatus: string
  ) => {
    const result = await updateTask(taskId, newStatus);
    if (result.success) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, status: newStatus as TaskData['status'] }
            : t
        )
      );
      addToast(result.message, 'success');
    } else {
      addToast(result.message, 'error');
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createTask(formData);

    if (result.success && result.taskId) {
      setTasks((prev) => [
        ...prev,
        {
          ...formData,
          id: result.taskId!,
          createdAt: Date.now(),
        },
      ]);
      addToast('✨ Task created successfully!', 'success');
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Todo',
      });
    } else {
      addToast(result.message, 'error');
    }

    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const todoTasks = tasks.filter((t) => t.status === 'Todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const doneTasks = tasks.filter((t) => t.status === 'Done');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg">
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <CardHeader className="bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <div>
                <CardTitle>✨ Task Manager</CardTitle>
                <CardDescription>
                  Create and manage tasks with elegant animations
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <motion.form
              onSubmit={handleAddTask}
              className="space-y-4 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-blue-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">✨</span>
                <label className="text-sm font-semibold text-slate-700">
                  Create New Task
                </label>
              </div>
              <Input
                label="Task Title"
                placeholder="Add a new task..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Priority"
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      priority: value as TaskData['priority'],
                    })
                  }
                >
                  <div />
                </Select>
                <Select
                  label="Status"
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as TaskData['status'],
                    })
                  }
                >
                  <div />
                </Select>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
                >
                  {isLoading ? '✨ Adding...' : '✨ Add Task'}
                </Button>
              </motion.div>
            </motion.form>

            <Tabs defaultValue="Todo" className="w-full">
              <TabsList className="w-full bg-gradient-to-r from-slate-100 to-slate-200 p-1 border border-slate-200">
                <TabsTrigger
                  value="Todo"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600"
                >
                  📋 Todo ({todoTasks.length})
                </TabsTrigger>
                <TabsTrigger
                  value="In Progress"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-amber-600"
                >
                  ⚡ In Progress ({inProgressTasks.length})
                </TabsTrigger>
                <TabsTrigger
                  value="Done"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-green-600"
                >
                  ✅ Done ({doneTasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="Todo">
                {todoTasks.length === 0 ? (
                  <motion.p
                    className="text-center text-slate-400 py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No tasks yet. Create one to get started! 🚀
                  </motion.p>
                ) : (
                  <AnimatePresence>
                    <div className="space-y-3">
                      {todoTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleUpdateTaskStatus}
                          isDeleting={deletingId === task.id}
                        />
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </TabsContent>

              <TabsContent value="In Progress">
                {inProgressTasks.length === 0 ? (
                  <motion.p
                    className="text-center text-slate-400 py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No tasks in progress. Keep going! 💪
                  </motion.p>
                ) : (
                  <AnimatePresence>
                    <div className="space-y-3">
                      {inProgressTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleUpdateTaskStatus}
                          isDeleting={deletingId === task.id}
                        />
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </TabsContent>

              <TabsContent value="Done">
                {doneTasks.length === 0 ? (
                  <motion.p
                    className="text-center text-slate-400 py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No completed tasks yet. You're just getting started! 🌟
                  </motion.p>
                ) : (
                  <AnimatePresence>
                    <div className="space-y-3">
                      {doneTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleUpdateTaskStatus}
                          isDeleting={deletingId === task.id}
                        />
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

const TaskCard = ({
  task,
  onDelete,
  onStatusChange,
  isDeleting,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
  isDeleting: boolean;
}) => {
  const priorityConfig = {
    High: {
      color: 'from-red-500 to-pink-500',
      bg: 'bg-red-50 border-red-200',
      badge: 'bg-red-100 text-red-700',
      icon: '🔴',
    },
    Medium: {
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50 border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
      icon: '🟡',
    },
    Low: {
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50 border-green-200',
      badge: 'bg-green-100 text-green-700',
      icon: '🟢',
    },
  };

  const statusIcons = {
    Todo: '📋',
    'In Progress': '⚡',
    Done: '✅',
  };

  const config = priorityConfig[task.priority as keyof typeof priorityConfig];
  const statusIcon = statusIcons[task.status as keyof typeof statusIcons];

  const getNextStatuses = (currentStatus: string): Array<{ label: string; value: string }> => {
    switch (currentStatus) {
      case 'Todo':
        return [
          { label: '⚡ Start', value: 'In Progress' },
          { label: '✅ Complete', value: 'Done' },
        ];
      case 'In Progress':
        return [
          { label: '📋 Back to Todo', value: 'Todo' },
          { label: '✅ Complete', value: 'Done' },
        ];
      case 'Done':
        return [
          { label: '📋 Reopen', value: 'Todo' },
          { label: '⚡ In Progress', value: 'In Progress' },
        ];
      default:
        return [];
    }
  };

  const nextStatuses = getNextStatuses(task.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isDeleting ? 0.5 : 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`relative overflow-hidden rounded-xl border-2 transition-all ${
        isDeleting ? 'opacity-50' : ''
      }`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      <div className={`relative p-5 border ${config.bg} bg-white hover:shadow-xl transition-all duration-300 group`}>
        {/* Delete Animation Overlay */}
        {isDeleting && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}

        <div className="flex items-start justify-between gap-4">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{statusIcon}</span>
              <h4 className="font-bold text-slate-900 text-lg leading-tight break-words">
                {task.title}
              </h4>
            </div>

            {task.description && (
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                {task.description}
              </p>
            )}

            {/* Priority & Status Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <motion.span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.badge} shadow-sm`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <span>{config.icon}</span>
                {task.priority} Priority
              </motion.span>

              <motion.span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <span>{statusIcon}</span>
                {task.status}
              </motion.span>
            </div>

            {/* Status Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {nextStatuses.map((statusOption) => (
                <motion.button
                  key={statusOption.value}
                  onClick={() => onStatusChange(task.id, statusOption.value)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {statusOption.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <motion.button
            onClick={() => onDelete(task.id)}
            disabled={isDeleting}
            className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isDeleting ? { opacity: 1 } : {}}
            title="Delete task"
          >
            <span className="text-lg">🗑️</span>
          </motion.button>
        </div>

        {/* Progress Indicator for In Progress Tasks */}
        {task.status === 'In Progress' && (
          <div className="mt-4 h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
              animate={{ width: ['0%', '100%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        )}

        {/* Completion Check for Done Tasks */}
        {task.status === 'Done' && (
          <motion.div
            className="mt-4 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-lg">✅</span>
            <span className="text-sm font-medium text-green-600">
              Completed!
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
