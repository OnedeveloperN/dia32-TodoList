# Día 32 - Full-Stack To-Do List App

Aplicación web Full-Stack de gestión de tareas construida con React, Express y Tailwind CSS. Proyecto desarrollado siguiendo una arquitectura modular, enrutamiento dinámico y estado global de usuario.

---

## 🚀 Despliegue en Vivo

* **Frontend (Vercel):** [https://dia32-todo-list.vercel.app](https://dia32-todo-list.vercel.app)
* **Backend API (Vercel):** [https://dia32-todo-list.vercel.app/api/tasks](https://dia32-todo-list.vercel.app/api/tasks)
* **Repositorio GitHub:** [https://github.com/OnedeveloperN/dia32-TodoList](https://github.com/OnedeveloperN/dia32-TodoList)

---

## ✨ Características y Requisitos Cumplidos

* **Backend (Node.js & Express):**
  * Servidor REST API con arquitectura modular (ES Modules).
  * Rutas HTTP implementadas: `GET` (todas y por ID), `POST`, `PUT` y `DELETE`.
  * Soporte de CORS y lectura de variables de entorno con `dotenv`.

* **Frontend (React + Vite + Tailwind CSS v4):**
  * **Navegación:** Configuración de rutas mediante `react-router-dom` (`/`, `/new-task`, `/edit/:id`, `/task/:id`).
  * **Formularios optimizados:** Uso de referencias (`useRef`) para capturar entradas de texto sin re-renderizados innecesarios.
  * **Gestión de Filtros:** Filtrado dinámico en memoria (Todas, Pendientes, Completadas) con contadores en tiempo real.

* **Estado Global (`useContext`):**
  * `UserProvider` e integración del hook personalizado `useUser` para acceder a la información de la sesión activa desde cualquier componente de la interfaz.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 19, Vite, React Router 7, Tailwind CSS v4.
* **Backend:** Node.js, Express.js, CORS, Dotenv.
* **Despliegue:** Vercel (Frontend & Serverless Backend).

---

## ⚙️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/OnedeveloperN/dia32-TodoList.git](https://github.com/OnedeveloperN/dia32-TodoList.git)
   cd dia32-TodoList


Iniciar en Backend

cd backend
npm install
npm run dev

Iniciar en Frontend

cd ../frontend
npm install
npm run dev