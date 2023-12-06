import "./App.css";
import { useEffect, useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

function App() {
  const [toDoData, setToDoData] = useState(initialTodoData);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(toDoData));
  }, [toDoData]);

  const handleDeleteAll = () => {
    setToDoData([]);
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleDeleteAll}>Delete All</button>
        </div>

        <Form setToDoData={setToDoData} />
        <Lists toDoData={toDoData} setToDoData={setToDoData} />
      </div>
    </div>
  );
}

export default App;
