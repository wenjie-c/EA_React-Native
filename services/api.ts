import { Platform } from 'react-native';

const getBaseUrl = () => {
    const physicalDeviceIP = '192.168.1.22';

    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:1337';
    } else if (Platform.OS === 'ios') {
        return `http://${physicalDeviceIP}:1337`;
    } else {
        return 'http://localhost:1337';
    }
};


export const API_BASE_URL = getBaseUrl();

export const api = {

    //    USUARIOS

    getUsuarios: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (getUsuarios):', error);
            throw error;
        }
    },

    getUsuarioById: async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (getUsuarioById):', error);
            throw error;
        }
    },

    createUsuario: async (userData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (createUsuario):', error);
            throw error;
        }
    },

    updateUsuario: async (id: string, userData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (updateUsuario):', error);
            throw error;
        }
    },

    deleteUsuario: async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (deleteUsuario):', error);
            throw error;
        }
    },


    //  ORGANIZACIONES

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
