import './css/general.css';
import {useEffect, useRef, useState} from "react";

export default function App() {
    const [data, setData] = useState(
        {
            count: 2,
            todoData: [
                {id: 1, title: 'Todo 1', completed: true},
                {id: 2, title: 'Todo 2', completed: false}
            ],
        }
    );
    const inputRefs = useRef();
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        // console.log("updated data:", data);
        const newId = data.count;
        if (inputRefs[newId]) {
            inputRefs[newId].focus();
        }
    }, [data.count])

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

    return (
        <div className="App">
            <div className="todo-header">
                <h1>Todos 앱</h1>
                <span className="new-todo"
                      onClick={() => handleAddNewTodo()}>
                    새로운 TODO 추가하기</span>
            </div>
            {data.todoData.map((item) => {
                return (
                    <div className="add-todos" key={item.id}>
                        <input type="checkbox"
                               checked={item.completed}
                               onChange={(e) => handleOnChangeChecked(e, item.id)}
                        />
                        {item.completed ?
                            <label className={item.completed ? "todo todo-complete" : "todo"}>
                                {item.title}
                            </label>
                            :
                            <input
                                className={item.completed ? "todo todo-complete" : "todo"}
                                type="text"
                                value={item.title}
                                onChange={(e) => handleOnChangeTitle(e, item.id)}
                                onKeyUp={(e) => handleSubmit(e, item.id)}
                                ref={(ref) => inputRefs[item.id] = ref}
                            />
                        }
                        <img className={item.completed ? "modifyImg": ""}
                             src="/assets/modify.svg"
                             alt="modify"
                             onClick={() => handleModifyTodo(item.id)}
                        />
                        <img src="/assets/delete.svg"
                             alt="delete"
                             onClick={() => handleDeleteTodo(item.id)}
                        />
                    </div>
                )
            })}
        </div>
    );
}
