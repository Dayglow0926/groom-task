import React, { useState } from "react";

function List({
  id,
  title,
  completed,
  toDoData,
  setToDoData,
  provided,
  snapshot,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

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

  const handleEditChage = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodoData = toDoData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
      }

      return data;
    });

    setToDoData(newTodoData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        key={id}
      >
        <div className="flex gap-4">
          <form onSubmit={handleSubmit}>
            <input
              value={editedTitle}
              className="w-full px-2 py-2 mr-4 text-gray-500 rounded"
              onChange={handleEditChage}
            />
          </form>
        </div>
        <div className="flex gap-4">
          <button type="submit" onClick={handleSubmit}>
            save
          </button>
          <button onClick={() => setIsEditing(false)}>X</button>
        </div>
      </div>
    );
  } else {
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
        <label className="flex gap-4 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => handleCompletedChange(id)}
          />
          <span className={completed ? "line-through" : undefined} disabled>
            {title}
          </span>
        </label>
        <div className="flex gap-4">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleClick(id)}>X</button>
        </div>
      </div>
    );
  }
}

export default List;
