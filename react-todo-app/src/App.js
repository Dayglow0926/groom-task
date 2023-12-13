import "./App.css";
import { useEffect, useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
let init = true;

function App() {
  const [expenses, setExpenses] = useState(initialTodoData);
  const [length, setLength] = useState(initialTodoData.length);
  const [expensesName, setExpensesName] = useState("");
  const [expensesPay, setExpensesPay] = useState(0);
  const [expensesId, setExpensesId] = useState(null);
  const [alertColor, setAlertColor] = useState("hidden");
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    if (init) {
      init = false;
      return;
    }

    if (length < expenses.length) {
      //생성
      setAlertColor("bg-green-500");
      setAlertContent("아이템을 생성하였습니다.");
    } else if (length > expenses.length) {
      //삭제
      setAlertColor("bg-red-500");
      setAlertContent("아이템을 삭제하였습니다.");
    } else {
      setAlertColor("bg-green-500");
      setAlertContent("아이템을 수정하였습니다.");
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    setLength(expenses.length);
    setTimeout(() => {
      setAlertColor("hidden");
    }, 1000);
  }, [expenses]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100 flex-col px-10">
      <div
        className={`${alertColor} justify-center text-center w-full text-2xl text`}
      >
        {alertContent}
      </div>
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
        <button onClick={() => setExpenses([])}>목록 지우기</button>
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
