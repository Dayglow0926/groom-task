import React from "react";

function List({
  id,
  title,
  pay,
  expenses,
  setExpenses,
  provided,
  snapshot,
  setExpensesName,
  setExpensesPay,
  setExpensesId,
}) {
  const handleClick = (id) => {
    let newTodoData = expenses.filter((data) => data.id !== id);
    setExpenses(newTodoData);
  };

  const handleEditClick = () => {
    setExpensesId(id);
    setExpensesName(title);
    setExpensesPay(pay);
  };

  return (
    <div
      className={`${
        snapshot.isDragging ? " bg-gray-400" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
    >
      <div className="flex w-full gap-4 cursor-pointer justify-between">
        <span className="w-1/2">{title}</span>
        <span className="w-1/2">{pay}</span>
      </div>
      <div className="flex gap-4">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={() => handleClick(id)}>X</button>
      </div>
    </div>
  );
}

export default List;
