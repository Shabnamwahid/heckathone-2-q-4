// 'use client';

// import Link from 'next/link';
// import { useAuth } from "@/lib/auth-client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// // Define TypeScript interfaces
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   completed: boolean;
//   user_id: string;
//   created_at: string;
//   updated_at: string;
// }

// export default function Dashboard() {
//   const { user, isAuthenticated } = useAuth();
//   const router = useRouter();
//   const [tasks, setTasks] = useState<Task[]>([
//     { 
//       id: "1", 
//       title: "Sample Task", 
//       description: "This is a sample task", 
//       completed: false, 
//       user_id: "demo", 
//       created_at: new Date().toISOString(), 
//       updated_at: new Date().toISOString() 
//     }
//   ]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskDescription, setNewTaskDescription] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.replace("/login");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return null;
//   }

//   const handleAddTask = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!newTaskTitle.trim()) return;
    
//     const newTask: Task = {
//       id: Date.now().toString(), // Simple ID generation for demo
//       title: newTaskTitle,
//       description: newTaskDescription,
//       completed: false,
//       user_id: user?.id || "demo",
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString()
//     };
    
//     setTasks([...tasks, newTask]);
//     setNewTaskTitle("");
//     setNewTaskDescription("");
//   };

//   const handleToggleTask = (taskId: string) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const handleDeleteTask = (taskId: string) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       setTasks(tasks.filter(task => task.id !== taskId));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
//             Welcome to Dashboard, {user?.full_name || user?.email?.split('@')[0] || "User"}!
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">Manage your tasks efficiently</p>
//         </div>

//         {error && (
//           <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
//             {error}
//           </div>
//         )}

//         {/* Add Task Form */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Task</h2>
//           <form onSubmit={handleAddTask} className="space-y-4">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Title *
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 value={newTaskTitle}
//                 onChange={(e) => setNewTaskTitle(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 placeholder="Enter task title"
//                 required
//                 minLength={1}
//                 maxLength={255}
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 value={newTaskDescription}
//                 onChange={(e) => setNewTaskDescription(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 placeholder="Enter task description (optional)"
//                 rows={4}
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md"
//             >
//               Add Task
//             </button>
//           </form>
//         </div>

//         {/* Tasks List */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Tasks</h2>
          
//           {tasks.length === 0 ? (
//             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//               No tasks yet. Add a new task to get started!
//             </div>
//           ) : (
//             <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//               {tasks.map((task) => (
//                 <li key={task.id} className="py-5">
//                   <div className="flex items-start gap-4">
//                     <input
//                       type="checkbox"
//                       id={`task-${task.id}`}
//                       checked={task.completed}
//                       onChange={() => handleToggleTask(task.id)}
//                       className="mt-1.5 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700"
//                     />
//                     <label 
//                       htmlFor={`task-${task.id}`} 
//                       className="flex-1 cursor-pointer select-none"
//                     >
//                       <div className="flex items-center justify-between">
//                         <h3
//                           className={`text-lg font-medium ${
//                             task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"
//                           }`}
//                         >
//                           {task.title}
//                         </h3>
//                         <div className="flex space-x-3">
//                           <button
//                             onClick={() => handleToggleTask(task.id)}
//                             className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
//                               task.completed
//                                 ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200"
//                                 : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200"
//                             }`}
//                           >
//                             {task.completed ? "Undo" : "Complete"}
//                           </button>
//                           <button
//                             onClick={() => handleDeleteTask(task.id)}
//                             className="px-4 py-1.5 text-sm bg-red-100 text-red-800 rounded-full font-medium hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200 transition"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                       {task.description && (
//                         <p className={`mt-2 text-sm ${
//                           task.completed ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-600 dark:text-gray-300"
//                         }`}>
//                           {task.description}
//                         </p>
//                       )}
//                       <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
//                         Created: {new Date(task.created_at).toLocaleString()}
//                       </p>
//                     </label>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/lib/auth-client';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // For update

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      // Load tasks from backend (example API call)
      // await fetchTasks(); // add real API later
      setTasks([
        { id: "1", title: "Sample Task", description: "This is a sample task", completed: false, user_id: "demo", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ]);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      user_id: user?.id || "demo",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleUpdateTask = (taskId: string) => {
    if (!editingTask) return;
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, title: editingTask.title, description: editingTask.description, updated_at: new Date().toISOString() } : task
    ));
    setEditingTask(null);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed, updated_at: new Date().toISOString() } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure?")) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome, {user?.full_name || user?.email || "User"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your tasks</p>
          <button onClick={logout} className="mt-4 text-red-600">Logout</button>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Add/Update Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {editingTask ? "Update Task" : "Add New Task"}
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (editingTask) handleUpdateTask(editingTask.id);
            else handleAddTask(e);
          }} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={editingTask ? editingTask.title : newTaskTitle}
                onChange={(e) => editingTask ? setEditingTask({...editingTask, title: e.target.value}) : setNewTaskTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter task title"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={editingTask ? editingTask.description : newTaskDescription}
                onChange={(e) => editingTask ? setEditingTask({...editingTask, description: e.target.value}) : setNewTaskDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter task description (optional)"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
            {editingTask && (
              <button
                onClick={() => setEditingTask(null)}
                className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium transition duration-200"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Tasks List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Tasks</h2>
          
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No tasks yet. Add a new task to get started!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map((task) => (
                <li key={task.id} className="py-5">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="mt-1.5 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <label 
                      htmlFor={`task-${task.id}`} 
                      className="flex-1 cursor-pointer select-none"
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-lg font-medium ${
                            task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setEditingTask(task)}
                            className="px-4 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-full font-medium hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
                              task.completed
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200"
                                : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200"
                            }`}
                          >
                            {task.completed ? "Undo" : "Complete"}
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="px-4 py-1.5 text-sm bg-red-100 text-red-800 rounded-full font-medium hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {task.description && (
                        <p className={`mt-2 text-sm ${
                          task.completed ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-600 dark:text-gray-300"
                        }`}>
                          {task.description}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        Created: {new Date(task.created_at).toLocaleString()}
                      </p>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}