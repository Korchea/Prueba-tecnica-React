import React, { useState } from "react";
import { TodoItem } from "./TodoItem.tsx";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export const TodoBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAddTask = async () => {
        const newTask = {
            title: "Nueva tarea",
            description: "Nueva descripción",
            completed: false
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, newTask, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            console.log('task', tasks);
            setTasks(prevTasks => prevTasks.filter(tasks => tasks.response.id !== id));
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    const handleEditTask = async (updatedTask: Task) => {
        try {
            
            console.log('update', updatedTask);
            setTasks(prevTasks => prevTasks.map(tasks => (tasks.id === updatedTask.id ? updatedTask : tasks)));
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };
    

    return (
        <div className="todo-board">
            {tasks.map((task, index) => (
                <TodoItem key={task.id || index} todo={task.response} onDelete={handleDeleteTask} onEdit={handleEditTask} />
            ))}

            <Card className="todo-item add-task-button" onClick={handleAddTask}>
                <Button icon="pi pi-plus" className="p-button-rounded p-button-text" />
            </Card>
        </div>
    );
};
