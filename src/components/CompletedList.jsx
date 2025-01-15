import React from 'react';

function CompletedList(props) {
    const completedList = props.todos.filter(todo => todo.completed);

    return (
        <div>
            <h5>Completed</h5>
            <ul>
                {completedList.map(complete => {
                    return <li>{complete.name}
                        <button onClick={() => props.undoCompletedTodo(complete.id)}>Undo</button>
                        <button onClick={() => props.deleteTodo(complete.id)}>Delete</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CompletedList;
