import React from "react";

function List({
  id,
  title,
  completed,
  toDoData,
  setToDoData,
  provided,
  snapshot,
}) {
  const handleCompletedChange = (id) => {
    let newTodoData = toDoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }

      return data;
    });

    setToDoData(newTodoData);
  };

  const handleClick = (id) => {
    let newTodoData = toDoData.filter((data) => data.id !== id);
    setToDoData(newTodoData);
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
      <div className="flex gap-4">
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={() => handleCompletedChange(id)}
        />
        <span className={completed ? "line-through" : undefined}>{title}</span>
      </div>
      <button onClick={() => handleClick(id)}>x</button>
    </div>
  );
}

export default List;
