import React, { useState } from 'react';
import { format } from 'date-fns';

function EditTodo({ todo, onSave, onCancel }) {
    const [editValue, setEditValue] = useState(todo.name);
    const [editDueDate, setEditDueDate] = useState(format(new Date(todo.dueDate), 'MM-dd-yyyy h:mm a'));

    const editTodo = (e) => {
        setEditValue(e.target.value);
    }

    const editDueDateHandler = (e) => {
        setEditDueDate(e.target.value);
    }

    const submitEditedTodo = (e) => {
        e.preventDefault();
        if (!editValue.trim()) return;
        if (!editDueDate.trim()) return;
        onSave(todo.id, editValue, editDueDate);
        console.log(editDueDate);
    }

    return (
        <form onSubmit={submitEditedTodo}>
            <input type="text" value={editValue} onChange={editTodo} />
            <input value={editDueDate} onChange={editDueDateHandler} />
            <button type="submit">Save</button>
            <button onClick={onCancel}>Cancel</button>
        </form>
    )
}

export default EditTodo;