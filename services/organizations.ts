import { API_BASE_URL } from './api';

export const organizacionService = {
    getOrganizaciones: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/organizaciones`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (getOrganizaciones):', error);
            throw error;
        }
    },

    getOrganizacionById: async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/organizaciones/${id}`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (getOrganizacionById):', error);
            throw error;
        }
    },

    createOrganizacion: async (orgData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/organizaciones`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orgData)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (createOrganizacion):', error);
            throw error;
        }
    },

    updateOrganizacion: async (id: string, orgData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/organizaciones/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orgData)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (updateOrganizacion):', error);
            throw error;
        }
    },

    deleteOrganizacion: async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/organizaciones/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (deleteOrganizacion):', error);
            throw error;
        }
    },

    getUsuariosPorOrganizacion: async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/organizaciones/${id}/users`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (getUsuariosPorOrganizacion):', error);
            throw error;
        }
    }
};
