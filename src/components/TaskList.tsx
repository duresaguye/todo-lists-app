import type React from "react"
import TaskItem from "./TaskItem"

interface Task {
  id: number
  text: string
  completed: boolean
  dueDate: string
  priority: "low" | "medium" | "high"
  category: string
}

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: number) => void
  onRemoveTask: (id: number) => void
  moveTask: (dragIndex: number, hoverIndex: number) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onRemoveTask, moveTask }) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          index={index}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onRemove={() => onRemoveTask(task.id)}
          moveTask={moveTask}
        />
      ))}
    </ul>
  )
}

export default TaskList

