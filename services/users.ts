import { API_BASE_URL } from "./api";

export const usuarioService = {
  getUsuarios: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Error (getUsuarios):", error);
      throw error;
    }
  },

  getUsuarioById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Error (getUsuarioById):", error);
      throw error;
    }
  },

  createUsuario: async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Error (createUsuario):", error);
      throw error;
    }
  },

  updateUsuario: async (id: string, userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Error (updateUsuario):", error);
      throw error;
    }
  },

  deleteUsuario: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Error (deleteUsuario):", error);
      throw error;
    }
  },
};
