import React from "react";
import './css/general.css';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 2,
            todoData: [
                { id: 1, title: 'Todo 1', completed: true },
                { id: 2, title: 'Todo 2', completed: false }
            ]
        }
        this.inputRefs = {};
    }
    handleModify = (id) => {
        if (this.inputRefs[id]) {
            this.inputRefs[id].focus();
        }
    }
    handleDelete = (id) => {
        let index = this.state.todoData.filter((data) => data.id !== id);
        this.setState({todoData: index});
    }
    handleOnChangeChecked = (e, id) => {
        // console.log(e.target.checked);
        const newTodo = this.state.todoData.map((todo) => {
            if (todo.id === id) {
                return {...todo, completed: e.target.checked};
            }
            return todo;
        });

        this.setState({ todoData: newTodo });
    }
    handleOnChangeInput = (e, id) => {
        // console.log(e.target.value);
        const newTodo = this.state.todoData.map((todo) => {
            if (todo.id === id) {
                return {...todo, title: e.target.value};
            }
            return todo;
        });

        this.setState({ todoData: newTodo });
    }
    handleOnSubmit = (e, id) => {
        if (e.key === "Enter"){
            if (this.inputRefs[id]) {
                this.inputRefs[id].blur();
            }
        }
    }
    handleAddNewTODO = () => {
        const emptyTodo = this.state.todoData.find((todo) => todo.title.trim().length === 0);
        if (emptyTodo) {
            alert("입력하지 않은 할일이 있습니다.!");
            return;
        }

        this.setState((prevState) => {
            const newTodoData = {
                id: prevState.count + 1,
                title: "",
                completed: false,
            }
            return {
                count: prevState.count + 1,
                todoData: [...prevState.todoData, newTodoData],
            }
        }, () => {
            const newId = this.state.count;
            if (this.inputRefs[newId]) {
                this.inputRefs[newId].focus();
            }
        });
    }
    render() {
        return (
            <>
                <div className="todo-header">
                    <h1>Todos 앱</h1>
                    <span className="new-todo" onClick={() => this.handleAddNewTODO()}>새로운 TODO 추가하기</span>
                </div>
                {this.state.todoData.map((data)=> (
                    <div className="add-todos" key={data.id}>
                        <input type="checkbox"
                               checked={data.completed}
                               onChange={(e) => this.handleOnChangeChecked(e, data.id)}/>
                        <input
                            className={data.completed !== true ? "todo" : "todo todo-complete"}
                            type="text"
                            name="value"
                            value={data.title}
                            placeholder="할 일 입력하기"
                            ref={(ref) => this.inputRefs[data.id] = ref}
                            onChange={(e) => this.handleOnChangeInput(e, data.id)}
                            onKeyUp={(e) => this.handleOnSubmit(e, data.id)}
                        />
                        <img src="/assets/modify.svg" alt="modify"
                             onClick={() => this.handleModify(data.id)}
                        />
                        <img src="/assets/delete.svg" alt="delete"
                             onClick={() => this.handleDelete(data.id)}
                        />
                    </div>
                ))}
            </>
        )
    }
}