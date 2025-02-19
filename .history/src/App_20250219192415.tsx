import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import ProgressBar from "./components/ProgressBar";
import DarkModeToggle from "./components/DarkModeToggle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
  priority: "low" | "medium" | "high";
  category: string;
}

type FilterType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [lightMode, setLightMode] = useState<boolean>(() => {
    // Get the initial light mode value from localStorage
    if (typeof localStorage !== 'undefined') {
      const storedLightMode = localStorage.getItem("lightMode");
      return storedLightMode ? JSON.parse(storedLightMode) : false;
    }
    return true; // Default to light mode if localStorage is not available
  });

  useEffect(() => {
    // Apply dark mode class to the root element
    if (lightMode) {
      document.documentElement.classList.remove("dark"); //remove dark class for light mode
    } else {
      document.documentElement.classList.add("dark"); //add dark class for dark mode
    }
  }, [lightMode]);

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("lightMode", JSON.stringify(lightMode));
  }, [lightMode]);

  const addTask = (
    text: string,
    dueDate: string,
    priority: "low" | "medium" | "high",
    category: string
  ) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      priority,
      category,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    setTasks(
      (prevTasks) => {
        const newTasks = [...prevTasks];
        const [draggedTask] = newTasks.splice(dragIndex, 1);
        newTasks.splice(hoverIndex, 0, draggedTask);
        return newTasks;
      }
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedPercentage =
    (tasks.filter((task) => task.completed).length / tasks.length) * 100 || 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={lightMode ? '' : 'dark'}>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen min-w-screen transition-colors duration-300">
          <div className="container mx-auto p-4 max-w-md">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Task Master
              </h1>
              <DarkModeToggle lightMode={lightMode} setLightMode={setLightMode} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <TaskForm onAddTask={addTask} />
              <ProgressBar percentage={completedPercentage} />
              <FilterButtons filter={filter} setFilter={setFilter} />
              <TaskList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onRemoveTask={removeTask}
                moveTask={moveTask}
              />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;