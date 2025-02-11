import React, { useEffect, useState } from "react";
import { getTodos, getTodo } from "../services/todoService.ts";
import { TodoItem } from "../components/TodoItem.tsx";
import { TodoBoard } from "../components/TodoBoard.tsx";
import { InputText } from "primereact/inputtext";

export const Home = () => {
    const [todos, setTodos] = useState<{ id: string; title: string; description: string; completed: boolean }[]>([]);
    const [searchId, setSearchId] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(todos);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
                setFilteredTasks(data);
            } catch (error) {
                console.error("Error al obtener las tareas:", error);
            }
        };
        fetchTodos();
    }, []);

    const handleDeleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        setFilteredTasks(prevTasks => prevTasks.filter(todo => todo.id !== id));
    };

    const handleUpdateTodo = (id: string, updatedTodo: { title: string; description: string; completed: boolean }) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
        ));
        setFilteredTasks(prevTasks => prevTasks.map(todo =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
        ));
    };

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (searchId.trim() === "") {
                setFilteredTasks(todos);
            } else {
                try {
                    const response = await getTodo(searchId, {});
                    setFilteredTasks([response.data.response]);
                } catch (error) {
                    console.error("Error al buscar la tarea:", error);
                    setFilteredTasks([]);
                }
            }
        }
    };

    return (
        <div style={{ background: 'url("/corcho2.svg")', padding: '20px', minHeight: '100vh', textAlign: 'center' }}>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{
                    color: 'white',
                    textShadow: '2px 2px 4px black',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    margin: 0
                }}>
                    ToDo Notes
                </h1>

                <div style={{ position: "absolute", right: 0 }}>
                    <InputText
                        placeholder="Buscar por ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        onKeyDown={handleSearch}
                        style={{
                            width: "250px",
                            padding: "8px",
                            fontSize: "1rem",
                            borderRadius: "5px"
                        }}
                    />
                </div>
            </div>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px"
            }}>
                {filteredTasks.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={handleDeleteTodo}
                        onUpdate={handleUpdateTodo}
                    />
                ))}
                <TodoBoard />
            </div>
        </div>
    );
};
