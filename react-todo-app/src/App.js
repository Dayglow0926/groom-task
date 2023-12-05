import "./App.css";
import { useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";

function App() {
  const [toDoData, setToDoData] = useState([]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>

        <Form setToDoData={setToDoData} />
        <Lists toDoData={toDoData} setToDoData={setToDoData} />
      </div>
    </div>
  );
}

export default App;
