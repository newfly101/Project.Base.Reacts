import './css/general.css';
import {useState} from "react";

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
    console.log(data);

    function handleOnChangeTitle(e, id) {
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

    return (
        <div className="App">
            <div className="todo-header">
                <h1>Todos 앱</h1>
                <span className="new-todo">새로운 TODO 추가하기</span>
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
