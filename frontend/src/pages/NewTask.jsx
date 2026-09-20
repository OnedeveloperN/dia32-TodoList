import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

// Definimos la URL base usando la variable de entorno o fallback a localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const NewTask = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;

        if (!title.trim() || !description.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            // Concatenamos dinámicamente /api/tasks
            const response = await fetch(`${API_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    userId: user.id,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al crear la tarea");
            }

            const newTask = await response.json();
            console.log("Tarea creada:", newTask);

            // Redirige a la página principal después de crear
            navigate("/");
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Crear Nueva Tarea</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        ref={titleRef}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej. Estudiar React Router"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        ref={descriptionRef}
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Escribe los detalles de la tarea..."
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Crear Tarea
                </button>
            </form>
        </div>
    );
};