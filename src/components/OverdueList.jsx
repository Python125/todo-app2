import React from 'react';

function OverdueList({ todos }) {
    const currentDate = new Date();
    const overdueTodos = todos.filter(todo => {
        const todoDate = new Date(todo.dueDate);
        return todoDate < currentDate;
    })

    return (
        <div>
            <h5>Overdue Items</h5>
            <ul>
                {overdueTodos.map(overdue => (
                    <li key={overdue.id}>{overdue.name} - Due: {overdue.dueDate}</li>
                ))}
            </ul>
        </div>
    )
}

export default OverdueList;