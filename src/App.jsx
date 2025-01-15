import './App.css';
import { useState, React, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  // useEffect(() => {
  //   axios.get(`${apiURL}/todos2`)
  //   .then(response => {
  //     setTodos(response.data);
  //   })
  // }, []);

  function addTodo(e) {
    todoInput(e.target.value);
  }

  function submitTodo(e) {
    e.preventDefault();
    if (!todoInput.trim()) return;

    if (Array.isArray(todos)) {
      const todoExists = todos.some(todo => todo.name.toLowerCase() === todoInput.trim().toLowerCase());
      if (todoExists) {
        alert('This already exists in your list');
        return;
      }
    }

    const newTodo = {
      id: todos.length + 1,
      name: todoInput.trim(),
      completed: false,
    }
    
    axios.post(`${apiURL}/todos2`, newTodo)
    .then(response => {
      setTodos([...todos, response.data]);
      setTodoInput('');
    })
  }

  if (!todos) return "No post!";

  const deleteTodo = (id) => {
    const newTodos = [...todos].filter(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return false; // If the id exists, the item is removed
      } else {
        return true; // If the id does not exist, the item is not removed
      }
    });

    axios.delete(`${apiURL}/todos2/${id}`)
      .then(() => {
        setTodos(newTodos);
      });
  }

  const updateTodo = (id, name) => {
    const newTodos = [...todos].map(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return { ...todo, name: name }; // If the id exists, the item is updated to the new name
      } else {
        return todo; // If the id does not exist, the item is not updated
      }
    })

    axios.put(`${apiURL}/todos2/${id}`, { name: name })
      .then(() => {
        setTodos(newTodos); // Updates the todos list with the new values
        setEditTodo(null);
      });
  }

  const completeTodo = (id) => {
    const newTodos = [...todos].map(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return { ...todo, completed: true }; // If the id exists, the todo's value is updated to true
      } else {
        return todo; // If the id does not exist, the todo's value is returned
      }
    })

    axios.put(`${apiURL}/todos2/${id}`, { completed: true })
      .then(() => {
        setTodos(newTodos); // Updates the todos list with the new values
      });
  };

  const incompleteTodo = todos.filter(todo => {
    if (todo.completed === false) {
      return true;
    } else {
      return false;
    }
  })

  const undoTodo = (id) => {
    const newTodos = [...todos].map(todo => {
      if (todo.id === id) { // If the id exists in the array
        return { ...todo, completed: false }; // Place the todo in the incompleted array
      } else {
        return todo; // Keep the todo in the completed array
      }
    })
    
    axios.put(`${apiURL}/todos2/${id}`, { completed: false })
      .then(() => {
        setTodos(newTodos);
      });
  }

  return (
    <div>
      <h1>Todo List</h1>
    </div>
  )
}

export default App;