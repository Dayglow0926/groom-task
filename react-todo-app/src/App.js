import "./App.css";
import { useEffect, useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";
import TargetInput from "./components/TargetInput";

const initialTodoData = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialTodoData);
  const [expensesName, setExpensesName] = useState("");
  const [expensesPay, setExpensesPay] = useState(0);
  const [expensesId, setExpensesId] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100 flex-col">
      <div className="flex justify-start w-full text-2xl "> 예산 계산기</div>
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <Form
          setExpenses={setExpenses}
          expensesName={expensesName}
          setExpensesName={setExpensesName}
          expensesPay={expensesPay}
          setExpensesPay={setExpensesPay}
          expensesId={expensesId}
          setExpensesId={setExpensesId}
        />
        <Lists
          expenses={expenses}
          setExpenses={setExpenses}
          setExpensesName={setExpensesName}
          setExpensesPay={setExpensesPay}
          setExpensesId={setExpensesId}
        />
        <button>목록 지우기</button>
      </div>
      <div className="flex w-full justify-end">
        총 지출 :
        {expenses.reduce((acc, cur) => {
          return acc + Number(cur.pay);
        }, 0)}
      </div>
    </div>
  );
}

export default App;
