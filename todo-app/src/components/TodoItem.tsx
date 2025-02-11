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
    onEdit: (updatedTodo: { id: string; title: string; description: string; completed: boolean }) => void;
}

export const TodoItem = ({ todo, onDelete, onEdit }: TodoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo);

    const handleDelete = async () => {
        try {
            console.log(todo);
            await deleteTodo(todo.id);
            onDelete(todo.id);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = () => {
        setEditedTodo({ ...editedTodo, completed: !editedTodo.completed });
    };

    const handleSave = async () => {
        try {
            await updateTodo(editedTodo.id, editedTodo); // Llamar a la API para actualizar la tarea
            console.log(editedTodo);
            onEdit(editedTodo); // Actualizar en el estado global
            setIsEditing(false); // Cerrar modal
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
            <Button icon="pi pi-pencil" className="edit-button p-button-text" onClick={() => setIsEditing(true)} />
            <Button icon="pi pi-trash" className="delete-button p-button-text p-button-danger" onClick={handleDelete} />

            {/* Modal de edición */}
            <Dialog header="Editar Tarea" visible={isEditing} onHide={() => setIsEditing(false)}>
                <div className="p-fluid">
                    <label>Título</label>
                    <InputText name="title" value={editedTodo.title} onChange={handleChange} />

                    <label>Descripción</label>
                    <InputText name="description" value={editedTodo.description} onChange={handleChange} />

                    <div className="p-field-checkbox">
                        <Checkbox checked={editedTodo.completed} onChange={handleCheckboxChange} />
                        <label>Completado</label>
                    </div>

                    <Button label="Guardar" onClick={handleSave} className="p-button-success" />
                </div>
            </Dialog>
        </Card>
    );
};
