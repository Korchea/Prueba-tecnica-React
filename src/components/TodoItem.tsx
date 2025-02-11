import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { deleteTodo, updateTodo } from "../services/todoService.ts";

interface TodoProps {
    todo: { id: string; title: string; description: string; completed: boolean };
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedTodo: { title: string; description: string; completed: boolean }) => void;
}

export const TodoItem = ({ todo, onDelete, onUpdate }: TodoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description);
    const [editedCompleted, setEditedCompleted] = useState(todo.completed);

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id);
            onDelete(todo.id);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    const handleEdit = async () => {
        try {
            const updatedTodo = {
                title: editedTitle,
                description: editedDescription,
                completed: editedCompleted,
            };

            await updateTodo(todo.id, updatedTodo);
            onUpdate(todo.id, updatedTodo);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };


    return (
        <Card className="todo-item" style={{ backgroundColor: "yellow", padding: "10px", margin: "10px", position: "relative" }}>
            <p><strong>{todo.title}</strong></p>
            <p>{todo.description}</p>
            <p>{todo.completed ? "✅ Completado" : "❌ Pendiente"}</p>

            {/* Botones */}
            <Button className="delete-button" onClick={handleDelete}>
                <img src="/delete.svg" alt="Eliminar" className="icon-button" />
            </Button>

            <Button className="edit-button" onClick={() => setIsEditing(true)}>
                <img src="/edit.svg" alt="Editar" className="icon-button" />
            </Button>

            {/* Diálogo de Edición */}
            <Dialog header="Editar Tarea" visible={isEditing} style={{ width: '500px' }} onHide={() => setIsEditing(false)}>
                <div className="p-fluid">
                    <label>Título:</label>
                    <InputText value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />

                    <label>Descripción:</label>
                    <InputText value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />

                    <label style={{ marginTop: '15px', display: 'block' }}>
                        <Checkbox checked={editedCompleted} onChange={(e) => setEditedCompleted(e.checked || false)} /> Completado
                    </label>
                </div>

                <div className="p-d-flex p-jc-end" style={{ marginTop: '10px' }}>
                    <Button label="Guardar" icon="pi pi-check" className="p-button-success" onClick={handleEdit} />
                </div>
            </Dialog>

        </Card>
    );
};
