import './css/general.css';
import React, {useEffect, useRef, useState} from "react";
import Lists from "./views/Lists.js";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";

export default function App() {
    const initialData = () => {
        const todos = localStorage.getItem("todos");
        return todos ? JSON.parse(todos) : [];
    };

    const [data, setData] = useState(() => {
        const todos = initialData();
        return {
            count: todos.length > 0 ? todos.length : 2,
            todoData: todos.length > 0
                ? todos
                : [
                    { id: 1, title: "Todo 1", completed: true },
                    { id: 2, title: "Todo 2", completed: false },
                ],
        };
    });
    const inputRefs = useRef();

    useEffect(() => {
        const newId = data.count;
        if (inputRefs[newId]) {
            inputRefs[newId].focus();
        }
    }, [data.count])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(data.todoData));
    }, [data]);

    const handleOnChangeTitle = (e, id) => {
        setData((prevState) => ({
            ...prevState,
            todoData: prevState.todoData.map((todo) =>
                todo.id === id
                    ? {...todo, title: e.target.value}
                    : todo
            )
        }));
    }
    const handleSubmit = (e, id) => {
        if (e.key === "Enter") {
            inputRefs[id].blur();
        }
    }
    const handleModifyTodo = (id) => {
        if (inputRefs[id]) {
            inputRefs[id].focus();
        }
    }
    const handleDeleteTodo = (id) => {
        setData((prevState) => ({
            ...prevState,
            todoData: prevState.todoData.filter((todo) => todo.id !== id),
        }));
    }

    const handleAddNewTodo = () => {
        const emptyTodo = data.todoData.find((todo) => todo.title.trim().length === 0);
        if (emptyTodo) {
            alert("입력하지 않은 할일이 있습니다.!");
            return;
        }

        setData((prevState) => {
            const newTodoData = {
                id: prevState.count + 1,
                title: "",
                completed: false
            };
            return {
                count: prevState.count + 1,
                todoData: [...prevState.todoData, newTodoData],
            }
        });
    }
    const handleOnChangeChecked = (e, id) => {
        const emptyTodo = data.todoData.find((data) => data.id === id);
        if (emptyTodo.title.trim().length === 0) {
            alert("항목을 입력하지 않으면 완료 할 수 없습니다.!");
            return;
        }

        setData((prevState) => ({
            ...prevState,
            todoData: prevState.todoData.map((todo) =>
                todo.id === id
                    ? {...todo, completed: e.target.checked}
                    : todo
            )
        }));
    }
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reOrderedTodos = Array.from(data.todoData);
        const [removed] = reOrderedTodos.splice(result.source.index, 1);
        reOrderedTodos.splice(result.destination.index, 0, removed);

        setData((prevState) => ({
            ...prevState,
            todoData: reOrderedTodos,
        }));
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="todo-header">
                <h1>Todos 앱</h1>
                <span className="new-todo"
                      onClick={() => handleAddNewTodo()}>
                    새로운 TODO 추가하기</span>
            </div>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="todo-list"
                    >
                        {data.todoData.map((item, index) => (
                            <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Lists
                                            item={item}
                                            setTodoData={setData}
                                            onChangeInput={handleOnChangeTitle}
                                            onChangeChecked={handleOnChangeChecked}
                                            handleModify={handleModifyTodo}
                                            handleDelete={handleDeleteTodo}
                                            onKeyupInput={handleSubmit}
                                            inputRefs={inputRefs}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
