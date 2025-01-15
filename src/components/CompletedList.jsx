import React from 'react';

function List(props) {
    const completedList = props.todos.filter(todo => todo.completed);

    return (
        <div>
            <h5>Completed</h5>
            <ul>
                {completedList.map(complete => {
                    return <li>{complete.name}
                        <button onClick={() => props.undoTodo(complete.id)}>Undo</button>
                        <button onClick={() => props.deleteTodo(complete.id)}>Delete</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default List;
