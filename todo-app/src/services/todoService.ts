import apiClient from './apiClient.ts';

export const getTodos = async () => {
    try {
        const response = await apiClient.get('/tasks');

        // Si la API devuelve un objeto, extraemos el array correcto
        if (response.data && Array.isArray(response.data.response)) {
            return response.data.response;
        }

        console.warn("Formato inesperado en la respuesta de la API:", response.data);
        return []; // Evita fallos si el formato no es el esperado
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.warn("No tasks found, returning empty array.");
            return [];
        }
        throw error;
    }
};

export const createTodo = async (todo: { title: string }) => {
    const response = await apiClient.post('/tasks', todo);
    return response.data;
};

export const updateTodo = async (id: string, updatedTodo: object) => {
    return await apiClient.put(`/tasks/${id}`, updatedTodo);
};

export const deleteTodo = async (id: string) => {
    return await apiClient.delete(`/tasks/${id}`);
};
