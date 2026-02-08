import { tasksAPI } from '@/lib/api';

export default function TasksPage() {
  // Redirect to dashboard since that's where tasks are managed
  if (typeof window !== 'undefined') {
    window.location.href = '/dashboard';
  }
  return <div>Redirecting to dashboard...</div>;
}