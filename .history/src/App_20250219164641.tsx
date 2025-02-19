import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import ProgressBar from "./components/ProgressBar";
import DarkModeToggle from "./components/DarkModeToggle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
        <div className="container mx-auto p-4 max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Task Master
            </h1>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <TaskForm addTask={addTask} />
            <ProgressBar tasks={tasks} />
            <FilterButtons filter={filter} setFilter={setFilter} />
            <TaskList tasks={filteredTasks} toggleTask={toggleTask} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;