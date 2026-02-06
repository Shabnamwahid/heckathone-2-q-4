'use client';

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { authAPI, tasksAPI } from '../lib/api';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Check for JWT token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      loadTasks();
    } else {
      setLoading(false);
    }
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksAPI.getAll();
      setTasks(data);
    } catch (error: any) {
      console.error('Error loading tasks:', error.message);
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await authAPI.login(email, password);
      const token = data.access_token;

      if (token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setLoginError('');
        loadTasks();
      }
    } catch (error: any) {
      setLoginError(error.message || 'Login failed');
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await tasksAPI.create({
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error: any) {
      console.error('Error adding task:', error.message);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await tasksAPI.delete(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error: any) {
      console.error('Error deleting task:', error.message);
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      const updatedTask = await tasksAPI.toggleComplete(taskId);
      setTasks(tasks.map(task =>
        task.id === taskId ? updatedTask : task
      ));
    } catch (error: any) {
      console.error('Error toggling task:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTasks([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 py-8 px-4">
      {/* Navbar */}
      <nav className="bg-white dark:bg-zinc-800 shadow-lg rounded-xl p-4 mb-8 border border-zinc-200 dark:border-zinc-700">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">TodoFlow</span>
          </div>

          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              variant="destructive"
              size="sm"
            >
              Logout
            </Button>
          )}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto">
        {!isLoggedIn ? (
          // Login Form
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-blue-600 dark:text-blue-400">TodoFlow</CardTitle>
              <CardDescription>Welcome back! Please login to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 text-red-700 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-900/50 text-sm">
                    {loginError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          // Task List
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>Manage your daily tasks efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex gap-3 mb-4">
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task title..."
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  />
                  <Button onClick={addTask}>
                    Add
                  </Button>
                </div>

                <Input
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="Task description (optional)..."
                />
              </div>

              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-zinc-600 dark:text-zinc-400">No tasks yet. Add your first task!</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className="p-4 rounded-lg border bg-white dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600"
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${
                              task.completed
                                ? 'line-through text-zinc-500 dark:text-zinc-400'
                                : 'text-zinc-800 dark:text-zinc-200'
                            }`}>
                              {task.title}
                            </h3>
                            <Badge variant={task.completed ? "secondary" : "default"}>
                              {task.completed ? "Completed" : "Pending"}
                            </Badge>
                          </div>
                          {task.description && (
                            <p className={`mt-1 text-sm ${
                              task.completed
                                ? 'line-through text-zinc-500 dark:text-zinc-400'
                                : 'text-zinc-600 dark:text-zinc-300'
                            }`}>
                              {task.description}
                            </p>
                          )}
                          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                            Created: {new Date(task.created_at).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          onClick={() => deleteTask(task.id)}
                          variant="destructive"
                          size="icon"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}