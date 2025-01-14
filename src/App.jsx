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

  function addTodo() {}

  return (
    <div>
      <h1>Todo List</h1>
    </div>
  )
}

export default TodoList
