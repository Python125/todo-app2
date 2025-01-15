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

  function handleSubmit(e) {
    e.preventDefault();
    if (!todoInput.trim()) return;

    if (Array.isArray(todos) ? todos.some(todo => todo.name.toLowerCase() === todoInput.trim().toLowerCase()): null) {
      alert('This already exists in your list');
      return;
    };

    const newTodo = {
      id: todos.length + 1,
      name: todoInput.trim(),
      completed: false,
    }

    axios.post(`${baseUrl}/todos`, newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        todoInput('');
      });
  }

  if (!todos) return "No post!";

  const handleDelete = (id) => {
    const newTodos = [...todos].filter(todo => {
      if (todo.id === id) {
        return false;
      } else {
        return true;
      }
    });

    axios.delete(`${baseUrl}/todos/${id}`)
      .then(() => {
        setTodos(newTodos);
      });
  }

  const handleUpdate = (id, name) => {
    const newTodos = [...todos].map(todo => {
      if (todo.id === id) {
        return { ...todo, name: name };
      } else {
        return todo;
      }
    })

    axios.put(`${baseUrl}/${id}`, { name: name })
      .then(() => {
        setTodos(newTodos);
        setEditTodo(null);
      });
  }

  const handleComplete = (id) => {
    const newTodos = [...todos].map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      } else {
        return todo;
      }
    })

    axios.put(`${baseUrl}/${id}`, { completed: true })
      .then(() => {
        setTodos(newTodos);
      });
  };

  const incomplete = todos.filter(todo => {
    if (todo.completed === false) {
      return true;
    } else {
      return false;
    }
  })

  const handleUndo = (id) => {
    const newTodos = [...todos].map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: false };
      } else {
        return todo;
      }
    })
    
    axios.put(`${baseUrl}/${id}`, { completed: false })
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