import './App.css';
import { useState, React, useEffect } from 'react';
import axios from 'axios';
import EditTodo from './components/Todo';
import List from './components/List';

import { MdAdd } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const apiURL = process.env.REACT_APP_API_URL;
//console.log(`API URL: ${apiURL}`);

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    axios.get(`${apiURL}/todos2`)
    .then(response => {
      setTodos(response.data);
    })
  }, []);

  function addTodo(e) {
    todoInput(e.target.value);
  }

  function submitTodo(e) {
    e.preventDefault();

    if (!todoInput.trim()) return;

    if (Array.isArray(todos)) {
      const todoExists = todos.some(todo => todo.name.toLowerCase() === inputValue.trim().toLowerCase());
      if (todoExists) {
        alert('This already exists in your list');
        return;
      }
    }

    const newTodo = {
      id: todos.length + 1,
      name: todoInput.trim(),
      completed: false
    }

    axios.post(`${apiURL}/todos2`, newTodo)
    .then(response => {
      setTodos([...todos, response.data]);
      setTodoInput('');
    })
  }

  if (!todos) return "No post!";

  const deleteTodo = (id) => {
    const newTodos = [...todos].filter(todo => {
      if (todo.id === id) {
        return false;
      } else {
        return true;
      }
    });

    axios.delete(`${apiURL}/todos2/${id}`)
    .then(() => {
      setTodos(newTodos);
    })
  }

  const updateTodo = (id, name) => {
    const newTodos = [...todos].map(todo => {
      if (todo.id === id) {
        return { ...todo, name };
      } else {
        return todo;
      }
    });

    axios.put(`${apiURL}/todos2/${id}`, { name })
    .then(() => {
      setTodos(newTodos);
      setEditTodo(null);
    })
  }

  return (
    <div>
      <h1>Todo List</h1>
    </div>
  )
}

export default TodoList