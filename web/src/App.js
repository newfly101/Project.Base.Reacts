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

        console.log("updated data:", data);
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
    function handleDeleteTodo(id) {
        setData((prevState) => ({
            ...prevState,
            todoData: prevState.todoData.filter((todo) => todo.id !== id),
        }));
    }

    function handleAddNewTodo() {
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
        // class형 component에서는 callback()이 바로 호출 되는 반면
        // function형에서는 callback()처리를 하고 싶으면 useEffect() 사용해야 함
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
                // console.log(item);
                return (
                    <div className="add-todos" key={item.id}>
                        <input type="checkbox"/>
                        <input
                            className="todo"
                            type="text"
                            value={item.title}
                            onChange={(e) => handleOnChangeTitle(e, item.id)}
                            ref={(ref) => inputRefs[item.id] = ref}
                        />
                        <img src="/assets/modify.svg" alt="modify"/>
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
