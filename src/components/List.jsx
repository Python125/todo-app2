import React from 'react';
import { FcUndo } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";

function List(props) {
    const completed = props.todos.filter(todo => todo.completed === true);

    return (
        <div>
            <h4>Completed</h4>
            <ul>
                {completed.map(completedTodo => {
                    return <li>{completedTodo.name}
                        <button onClick={() => props.handleUndo(completedTodo.id)}><FcUndo /></button>
                        <button onClick={() => props.handleDelete(completedTodo.id)}><FaTrash /></button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default List;