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
        if (!editDueDate) return;

        const localDateString = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeZone: 'America/New_York' }).format(editDueDate);

        onSave(todo.id, editValue, localDateString);
        console.log(localDateString);
    }

    return (
        <form onSubmit={submitEditedTodo}>
            <input type="text" value={editValue} onChange={editTodo} />
            <input value={editDueDate.toLocaleString()} onChange={editDueDateHandler} />
            <button type="submit">Save</button>
            <button onClick={onCancel}>Cancel</button>
        </form>
    )
}

export default EditTodo;