import './App.css';
import { useState, React, useEffect } from 'react';
import axios from 'axios';
import CompletedList from './components/CompletedList';
import EditTodo from './components/Edit';
import OverdueList from './components/OverdueList';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const apiURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiURL}`);

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [calenderDate, setCalenderDate] = useState(new Date());

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
    }, 1000);

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

    const [hours, minutes] = dueDate.split(':').map(Number);
    const dateTime = new Date(calenderDate);
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    const newTodo = {
      id: todos.length + 1,
      name: todoInput.trim(),
      completed: false,
      dueDate: dateTime.toISOString(),
      overDue: false,
    }
    
    axios.post(`${apiURL}/todos`, newTodo)
    .then(response => {
      setTodos([...todos, response.data]);
      setTodoInput('');
      setDueDate('');
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
    <div>
      <h1>Todo List</h1>
      <form onSubmit={submitTodo}>
        <input type="text" value={todoInput} onChange={addTodo} />
        <Calendar value={calenderDate} onChange={setCalenderDate} />
        <input type="time" value={dueDate} onChange={addDueDate} />
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
                {todo.name} - Due: {format(new Date(todo.dueDate), 'yyyy-M-d hh:mm a')}
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
  )
}

export default TodoList;