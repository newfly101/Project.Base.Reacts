import './css/general.css';
import {useState} from "react";

function App() {
    const [todoData, setTodoData] = useState([
        {
            count: 2,
            todoData: [
                {id: 1, title: 'Todo 1', completed: true},
                {id: 2, title: 'Todo 2', completed: false}
            ],
        }
    ]);
    console.log(todoData);
    return (
        <div className="App">
            <div className="todo-header">
                <h1>Todos 앱</h1>
                <span className="new-todo">새로운 TODO 추가하기</span>
            </div>
            <div className="add-todos">
                <input type="checkbox"/>
                <input className="todo" type="text"/>
                <img src="/assets/modify.svg" alt="modify"/>
                <img src="/assets/delete.svg" alt="delete"/>
            </div>
        </div>
    );
}

export default App;
