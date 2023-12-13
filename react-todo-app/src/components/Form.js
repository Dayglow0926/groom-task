import React, { useState } from "react";
import TargetInput from "./TargetInput";

export default function Form({
  setExpenses,
  expensesName,
  setExpensesName,
  expensesPay,
  setExpensesPay,
  expensesId,
  setExpensesId,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (expensesId != null) {
      setExpenses((prev) =>
        prev.map((v) => {
          if (v.id === expensesId) {
            v.title = expensesName;
            v.pay = expensesPay;
          }
          return v;
        })
      );

      setExpensesId(null);
    } else {
      let newTodo = {
        id: Date.now(),
        title: expensesName,
        pay: Number(expensesPay),
      };

      setExpenses((prev) => [...prev, newTodo]);
    }
    setExpensesName("");
    setExpensesPay(0);
  };

  return (
    <form onSubmit={handleSubmit} className="flex pt-2 flex-col gap-5">
      <div className="flex justify-between gap-10">
        <TargetInput
          title="지출 항목"
          placeholder="예) 렌트비"
          value={expensesName}
          onChange={(e) => setExpensesName(e.target.value)}
          type="text"
        />
        <TargetInput
          title="비용"
          placeholder="금액"
          value={expensesPay}
          onChange={(e) => setExpensesPay(e.target.value)}
          type="number"
        />
      </div>
      <input
        className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200 w-min cursor-pointer"
        type="submit"
        value="제출 ->"
      />
    </form>
  );
}
