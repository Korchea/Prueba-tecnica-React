import apiClient from './apiClient.ts';

export const getTodos = async () => {
    try {
        const response = await apiClient.get('/tasks');

        if (response.data && Array.isArray(response.data.response)) {
            return response.data.response;
        }

        console.warn("Formato inesperado en la respuesta de la API:", response.data);
        return [];
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

export const getTodo = async (id: string, updatedTodo: object) => {
    return await apiClient.get(`/tasks/${id}`);
};

export const deleteTodo = async (id: string) => {
    return await apiClient.delete(`/tasks/${id}`);
};
