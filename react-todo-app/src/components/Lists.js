import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

export default function Lists({
  expenses,
  setExpenses,
  setExpensesName,
  setExpensesPay,
  setExpensesId,
}) {
  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 태그 이벤트에 대한 정보가 포함됩니다.
    //console.log(result);

    //목적지가 없으면 ( 이벤트 취소 ) 이함수를 종료합니다.
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newExpenses = expenses;

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    // 2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderedItem] = newExpenses.splice(result.source.index, 1);

    //원하는 자리에 reorderedItem을 insert 해줍니다.
    newExpenses.splice(result.destination.index, 0, reorderedItem);

    setExpenses(newExpenses);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {expenses.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      pay={data.pay}
                      expenses={expenses}
                      setExpenses={setExpenses}
                      provided={provided}
                      snapshot={snapshot}
                      setExpensesName={setExpensesName}
                      setExpensesPay={setExpensesPay}
                      setExpensesId={setExpensesId}
                    />
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
