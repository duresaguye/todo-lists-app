import type React from "react"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import confetti from "canvas-confetti"

interface Task {
  id: number
  text: string
  completed: boolean
  dueDate: string
  priority: "low" | "medium" | "high"
  category: string
}

interface TaskItemProps {
  task: Task
  index: number
  onToggle: () => void
  onRemove: () => void
  moveTask: (dragIndex: number, hoverIndex: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, onToggle, onRemove, moveTask }) => {
  const ref = useRef<HTMLLIElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      moveTask(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => {
      return { id: task.id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))

  const handleToggle = () => {
    onToggle()
    if (!task.completed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const priorityColor = {
    low: "bg-green-200 dark:bg-green-700",
    medium: "bg-yellow-200 dark:bg-yellow-700",
    high: "bg-red-200 dark:bg-red-700",
  }

  return (
    <li
      ref={ref}
      style={{ opacity }}
      className={`flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-102 hover:bg-gray-50 dark:hover:bg-gray-600 ${priorityColor[task.priority]}`}
      data-handler-id={handlerId}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-700"
        />
        <div className="ml-3">
          <span
            className={`${task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"}`}
          >
            {task.text}
          </span>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {task.dueDate && <span className="mr-2">Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
            {task.category && (
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                {task.category}
              </span>
            )}
          </div>
        </div>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700 focus:outline-none transition duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  )
}

export default TaskItem

