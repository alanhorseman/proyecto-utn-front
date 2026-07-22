import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_LOCALSTORAGE_KEY } from "../context/AuthContext.jsx";

export async function createWorkspace(nombre, descripcion = "") {
  const token = localStorage.getItem(AUTH_TOKEN_LOCALSTORAGE_KEY);
  const res_http = await fetch(ENVIRONMENT.URL_API + '/api/workspace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      nombre,
      descripcion
    })
  });
  
  const res = await res_http.json();
  if (!res.ok) {
    throw new Error(res.message || 'Error al crear el espacio de trabajo');
  }

  return res;
}

export async function getAllWorkspaces() {
  const token = localStorage.getItem(AUTH_TOKEN_LOCALSTORAGE_KEY);
  const res_http = await fetch(ENVIRONMENT.URL_API + '/api/workspace', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const res = await res_http.json();
  if (!res.ok) {
    throw new Error(res.message || 'Error al obtener los espacios de trabajo');
  }

  return res;
}
