import { ThemeProvider } from "./components/ThemeContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import ProgressBar from "./components/ProgressBar";
import DarkModeToggle from "./components/DarkModeToggle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen min-w-screen transition-colors duration-300">
          <div className="container mx-auto p-4 max-w-md">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Task Master
              </h1>
              <DarkModeToggle />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <TaskForm />
              <ProgressBar />
              <FilterButtons />
              <TaskList />
            </div>
          </div>
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
