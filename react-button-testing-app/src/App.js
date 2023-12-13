import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{count}</h3>
        <div>
          <button data-testid="minus-button" onClick={(prev) => prev - 1}>
            -
          </button>
          <button
            data-testid="plus-button"
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </button>
          <div>
            <button
              data-testid="on/off-button"
              style={{ backgroundColor: "blue" }}
            >
              on/off
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
