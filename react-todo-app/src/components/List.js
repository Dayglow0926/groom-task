import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function List({ toDoData, setToDoData }) {
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

  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 태그 이벤트에 대한 정보가 포함됩니다.
    //console.log(result);

    //목적지가 없으면 ( 이벤트 취소 ) 이함수를 종료합니다.
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    // const newTodoData = toDoData;

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    // 2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderedItem] = toDoData.splice(result.source.index, 1);

    //원하는 자리에 reorderedItem을 insert 해줍니다.
    toDoData.splice(result.destination.index, 0, reorderedItem);

    setToDoData(toDoData);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {toDoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`${
                        snapshot.isDragging ? " bg-gray-400" : "bg-gray-100"
                      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={() => handleCompletedChange(data.id)}
                        />
                        <span
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        >
                          {data.title}
                        </span>
                      </div>
                      <button onClick={() => handleClick(data.id)}>x</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
