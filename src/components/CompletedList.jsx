import React from 'react';

function CompletedList(props) {
    const completed = props.todos.filter(todo => todo.completed);

    return (
        <div>
            <h5>Complete</h5>
            <ul>
                {completed.map(complete => {
                    return <li key={complete.id}>{complete.name}
                        <button onClick={() => props.undoCompletedTodo(complete.id)}>Undo</button>
                        <button onClick={() => props.deleteTodo(complete.id)}>Delete</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CompletedList;
