import React, { useState } from 'react';

function EditTodo({ todo, onSave, onCancel }) {
    const [editValue, setEditValue] = useState(todo.name);
    const [editDueDate, setEditDueDate] = useState(new Date(todo.dueDate));

    const editTodo = (e) => {
        setEditValue(e.target.value);
    }

    const editDueDateHandler = (e) => {
        setEditDueDate(e.target.value);
    }

    const submitEditedTodo = (e) => {
        e.preventDefault();
        if (!editValue.trim()) return; // This makes sure that their are characters in the input field
        if (!editDueDate.trim()) return;

        const dueDateString = new Date(editDueDate);
        const userDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/New_York', hour12: true }).format(dueDateString);

        onSave(todo.id, editValue, dueDateString, userDate);
        console.log(userDate);
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