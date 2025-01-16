import React from 'react';
import { format } from 'date-fns';

function OverdueList({ todos }) {
    const overdue = todos.filter(todo => todo.overDue);

    return (
        <div>
            <h5>Overdue</h5>
            <ul>
                {overdue.map(overdue => (
                    <li key={overdue.id}>
                        {overdue.name} - Due: {format(new Date(overdue.dueDate), 'yyyy-MM-dd HH:mm:ss')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OverdueList;