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
            // count : 이전 state값 그대로 유지
            todoData: prevState.todoData.map((todo) =>
                todo.id === id
                    ? {...todo, title: e.target.value}
                    : todo
                // map으로 쪼가르면 {id:1} , {id:2}
                // id가 변경하는 값과 일치하면 나머지 data는 prevState로 두고, title만 값 변경
                // id가 변경하는 값과 불일치하면 이전 값 그대로 유지
            )
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
                        <img src="/assets/delete.svg" alt="delete"/>
                    </div>
                )
            })}
        </div>
    );
}
