import React from "react";
import './css/general.css';


export default class App extends React.Component {
    todoData = [
        {
            id: 1,
            title: 'Todo 1',
            completed: true,
        },
        {
            id: 2,
            title: 'Todo 2',
            completed: false,
        }
    ];
    handleModify = (id) => {
        console.log(id);
    }
    handleDelete = (id) => {
        let index = this.todoData.filter((data) => data.id !== id);
        console.log(id);
    }
    handleOnChangeChecked = (e) => {
        return e !== true;
    }
    render() {
        return (
            <>
                <div className="todo-header">
                    <h1>Todos 앱</h1>
                    <span className="new-todo">새로운 TODO 추가하기</span>
                </div>
                <div className="add-todos">
                    <input type="checkbox"/>
                    <input className="todo" type="text" defaultChecked={false}/>
                    <img src="/assets/modify.svg" alt="modify"/>
                    <img src="/assets/delete.svg" alt="delete"/>
                </div>
                {this.todoData.map((data)=> (
                    <div className="add-todos" key={data.id}>
                        <input type="checkbox" checked={data.completed} onChange={(e) => this.handleOnChangeChecked(e)}/>
                        <input className="todo" type="text" defaultChecked={false} value={data.title}/>
                        <img src="/assets/modify.svg" alt="modify" onClick={() => this.handleModify(data.id)}/>
                        <img src="/assets/delete.svg" alt="delete" onClick={() => this.handleDelete(data.id)}/>
                    </div>
                ))}

            </>
        )
    }


}