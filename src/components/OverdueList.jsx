import React from 'react';
import { format } from 'date-fns';

function OverdueList({ todos }) {
    const currentDate = new Date();
    const overdueTodos = todos.filter(todo => {
        const todoDate = new Date(todo.dueDate);
        return todoDate < currentDate;
    });

    return (
        <div>
            <h5>Overdue</h5>
            <ul>
                {overdueTodos.map(overdue => (
                    <li key={overdue.id}>
                        {overdue.name} - Due: {format(new Date(overdue.dueDate), 'yyyy-MM-dd HH:mm:ss')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OverdueList;