import React from "react";
import { useEffect, useState } from 'react';
import { getTodos } from '../services/todoService.ts';
import { TodoItem } from '../components/TodoItem.tsx';
import { TodoBoard } from "../components/TodoBoard.tsx";

export const Home = () => {
    const [todos, setTodos] = useState<{ id: string; title: string; description: string }[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const data = await getTodos();
            setTodos(data);
        };
        fetchTodos();
    }, []);

    const handleDeleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id)); // Remueve la tarea eliminada de la UI
    };

    return (
        <div style={{ background: 'url("/corcho2.svg")', padding: '20px', minHeight: '100vh' }}>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
            ))}
            <TodoBoard />
        </div>
    );
};
