const API_BASE_URL = 'http://localhost:5000/api';

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[API GET ${endpoint} Failed]:`, err);
      throw err;
    }
  },

  async post<T>(endpoint: string, body: any): Promise<T> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[API POST ${endpoint} Failed]:`, err);
      throw err;
    }
  },

  async put<T>(endpoint: string, body: any): Promise<T> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[API PUT ${endpoint} Failed]:`, err);
      throw err;
    }
  },

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[API DELETE ${endpoint} Failed]:`, err);
      throw err;
    }
  }
};
