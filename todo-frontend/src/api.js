import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/v1';

export const fetchTodos = () => axios.get(`${API_BASE}/todos`);
export const createTodo = (data) => axios.post(`${API_BASE}/todos`, { todo: data });
export const updateTodo = (id, data) => axios.put(`${API_BASE}/todos/${id}`, { todo: data });
export const deleteTodo = (id) => axios.delete(`${API_BASE}/todos/${id}`);
