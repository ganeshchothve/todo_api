import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchTodos();
      setTodos(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await createTodo({ title, description });
      setTodos(prev => [res.data, ...prev]);
      setTitle('');
      setDescription('');
    } catch (err) { console.error(err); }
  };

  const toggleComplete = async (todo) => {
    try {
      const res = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos(prev => prev.map(t => t.id === todo.id ? res.data : t));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Todo List</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: 16 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Add</button>
      </form>

      {loading ? <div>Loading...</div> : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo)} />
                <strong style={{ marginLeft: 8, textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>{todo.description}</div>
              </div>
              <div>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
