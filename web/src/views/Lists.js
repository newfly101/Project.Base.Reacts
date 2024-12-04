import React from "react";
export default function Lists({item, inputRefs, onChangeInput, onChangeChecked, handleModify, handleDelete, onKeyupInput}) {
    return (
        <div className="add-todos" key={item.id}>
            <input type="checkbox"
                   checked={item.completed}
                   onChange={(e) => onChangeChecked(e, item.id)}
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
                    onChange={(e) => onChangeInput(e, item.id)}
                    onKeyUp={(e) => onKeyupInput(e, item.id)}
                    ref={(ref) => (inputRefs[item.id] = ref)}
                />
            }
            <img className={item.completed ? "modifyImg": ""}
                 src="/assets/modify.svg"
                 alt="modify"
                 onClick={() => handleModify(item.id)}
            />
            <img src="/assets/delete.svg"
                 alt="delete"
                 onClick={() => handleDelete(item.id)}
            />
        </div>
    );
}