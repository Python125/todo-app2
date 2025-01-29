import { useState, React, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CompletedList from './components/CompletedList';
import EditTodo from './components/Edit';
import OverdueList from './components/OverdueList';
import { format } from 'date-fns';
import { DateTimePicker } from '@mantine/dates';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const apiURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiURL}`);

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [calendarDate, setCalendarDate] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(`${apiURL}/todos`);
      const updatedTodos = response.data.map(todo => {
        if (!todo.completed && new Date(todo.dueDate) < new Date()) {
          return { ...todo, overDue: true };
        } else {
          return { ...todo, overDue: false };
        }
      });
      setTodos(updatedTodos);
    };

    fetchTodos();

    const interval = setInterval(() => {
      fetchTodos();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function addTodo(e) {
    setTodoInput(e.target.value);
  }
  
  function addDueDate(e) {
    setDueDate(e.target.value);
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

    const dateTime = new Date(calendarDate);
    console.log(dateTime);

    const newTodo = {
      id: todos.length + 1,
      name: todoInput.trim(),
      completed: false,
      dueDate: dateTime.toISOString(),
      overDue: false,
    }
    console.log(newTodo);
    
    axios.post(`${apiURL}/todos`, newTodo).then(response => {
      setTodos([...todos, response.data]);
      setTodoInput('');
      setDueDate('');
      setCalendarDate(null);
    })
  }

  if (!todos) return "No post!";

  const deleteTodo = (id) => {
    const newTodos = [...todos].filter(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        const isOverdue = new Date(todo.dueDate) < new Date();
        return false; // If the id exists, the item is removed
      } else {
        return true; // If the id does not exist, the item is not removed
      }
    });

    axios.delete(`${apiURL}/todos/${id}`)
      .then(() => {
        setTodos(newTodos);
      });
  }

  const updateTodo = (id, name, dueDate) => {
    const newTodos = [...todos].map(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return { ...todo, name: name, dueDate: dueDate }; // If the id exists, the item is updated to the new name and due date
      } else {
        return todo; // If the id does not exist, the item is not updated
      }
    })

    axios.put(`${apiURL}/${id}`, { name: name, dueDate: dueDate })
      .then(() => {
        setTodos(newTodos); // Updates the todos list with the new values
        setEditId(null);
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

    axios.put(`${apiURL}/${id}`, { completed: true })
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

  const undoCompletedTodo = (id) => {
    const newTodos = [...todos].map(todo => {
      if (todo.id === id) { // If the id exists in the array
        return { ...todo, completed: false }; // Place the todo in the incompleted array
      } else {
        return todo; // Keep the todo in the completed array
      }
    })
    
    axios.put(`${apiURL}/${id}`, { completed: false })
      .then(() => {
        setTodos(newTodos);
      });
  }

  return (
    <MantineProvider>
      <div style={{ backgroundColor: 'lightblue' }}>
        <h1>Todo List</h1>
        <form onSubmit={submitTodo}>
          <div style={{ width: '250px', margin: 'auto' }}>
            <input style={{ width: '100%' }} type="text" value={todoInput} onChange={addTodo} />
            <DateTimePicker value={calendarDate} onChange={(newDate) => setCalendarDate(newDate)} onCancel={() => setCalendarDate(null)} placeholder='Pick date and time' />
          </div>
          <button type="submit">Add Todo</button>
        </form>
        <h5>Incomplete</h5>
        <ul>
          {incompleteTodo.map((todo) => (
            <li key={todo.id}>
              {editId === todo.id ? (
                <EditTodo todo={todo} onSave={updateTodo} onCancel={() => setEditId(null)} />
              ) : (
                <>
                  {todo.name} - Due: {format(new Date(todo.dueDate), 'MM-dd-yyyy h:mm a')}
                  <button onClick={() => setEditId(todo.id)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => completeTodo(todo.id)}>Complete</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <CompletedList todos={todos} deleteTodo={deleteTodo} undoCompletedTodo={undoCompletedTodo} />
        <OverdueList todos={todos.filter(todo => todo.overDue && !todo.completed)} />
    </div>
    </MantineProvider>
  )
}

export default TodoList;