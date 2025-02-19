import { useState, useEffect } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import FilterButtons from "./components/FilterButtons"
import ProgressBar from "./components/ProgressBar"
import DarkModeToggle from "./components/DarkModeToggle"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

interface Task {
  id: number
  text: string
  completed: boolean
  dueDate: string
  priority: "low" | "medium" | "high"
  category: string
}

type FilterType = "all" | "active" | "completed"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
    const storedDarkMode = localStorage.getItem("darkMode")
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const addTask = (text: string, dueDate: string, priority: "low" | "medium" | "high", category: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      priority,
      category,
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const dragTask = tasks[dragIndex]
    setTasks(
      tasks.reduce((acc: Task[], task, idx, orig) => {
        if (idx === dragIndex) return acc
        if (idx === hoverIndex) {
          return [...acc, orig[dragIndex], task]
        }
        return [...acc, task]
      }, []),
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const completedPercentage = (tasks.filter((task) => task.completed).length / tasks.length) * 100 || 0

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
          <div className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
  <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
  <TaskForm addTask={addTask} />
  <FilterButtons filter={filter} setFilter={setFilter} />
  <TaskList tasks={filteredTasks} toggleTask={toggleTask} />
  <ProgressBar tasks={tasks} />
</div>
        </div>
      </div>
    </DndProvider>
  )
}

export default App
