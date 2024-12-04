import React from "react";
export default function Lists(props) {
    // props를 명시적으로 변수에 할당 하는 경우
    const {item, setTodoData, onChangeInput, onChangeChecked, handleModify, handleDelete, onKeyupInput, inputRefs} = props;

    return (
        <div className="add-todos" key={props.item.id}>
            <input type="checkbox"
                   checked={props.item.completed}
                   onChange={(e) => props.onChangeChecked(e, props.item.id)}
            />
            {props.item.completed ?
                <label className={props.item.completed ? "todo todo-complete" : "todo"}>
                    {props.item.title}
                </label>
                :
                <input
                    className={props.item.completed ? "todo todo-complete" : "todo"}
                    type="text"
                    value={props.item.title}
                    onChange={(e) => props.onChangeInput(e, props.item.id)}
                    onKeyUp={(e) => props.onKeyupInput(e, props.item.id)}
                    ref={(ref) => (props.inputRefs[props.item.id] = ref)}
                />
            }
            <img className={props.item.completed ? "modifyImg": ""}
                 src="/assets/modify.svg"
                 alt="modify"
                 onClick={() => props.handleModify(props.item.id)}
            />
            <img src="/assets/delete.svg"
                 alt="delete"
                 onClick={() => props.handleDelete(props.item.id)}
            />
        </div>
    );
}