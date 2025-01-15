import React, { useState } from 'react';

function EditTodo({ todo, OnSave, onCancel }) {
    const [editValue, setEditValue] = useState(todo.name);

    const editTodo = (e) => {
        setEditValue(e.target.value);
    }

    const submitEditedTodo = (e) => {
        e.preventDefault();
        if (!editValue.trim()) return; // This makes sure that their are characters in the input field
        OnSave(todo.id, editValue);
    }

    return (
        <form onSubmit={submitEditedTodo}>
            <input type="text" value={editValue} onChange={editTodo} />
            <button type="submit">Save</button>
            <button onClick={onCancel}>Cancel</button>
        </form>
    )
}
export default EditTodo;