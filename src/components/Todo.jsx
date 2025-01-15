import React, { useState } from 'react';
import { FaSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

function EditTodo({ todo, onSave, onCancel }) {
    const [editValue, setEditValue] = useState(todo.name);

    const editChange = (e) => {
        setEditValue(e.target.value);
    }

    const editSubmit = (e) => {
        e.preventDefault();
        if (!editValue.trim()) return;
        onSave(todo.id, editValue);
    };

    return (
        <form onSubmit={editSubmit}>
            <input type="text" value={editValue} onChange={editChange} />
            <button type="submit"><FaSave /></button>
            <button onClick={onCancel}><FcCancel /></button>
        </form>
    )
}

export default EditTodo;