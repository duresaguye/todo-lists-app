import { useState, useEffect } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <div className="container mx-auto p-4">
          <h1>Task Master</h1>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <p>Some content here.</p>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;