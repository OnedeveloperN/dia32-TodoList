import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const EditTask = () => {
    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [task, setTask] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/tasks/${id}`)
            .then((response) => response.json())
            .then((data) => setTask(data))
            .catch((error) => console.error("Error fetching task:", error));
    }, [id]);

    if (!task) {
        return <div className="text-center mt-10 text-gray-500">Cargando tarea...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;

        if (!title.trim() || !description.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/tasks/${id}`, {
                method: "PUT",
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
                throw new Error("Error al actualizar la tarea");
            }

            const updatedTask = await response.json();
            console.log("Tarea actualizada:", updatedTask);

            navigate(`/task/${id}`);
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
            <h1 className="text-2xl font-bold mb-4">Editar Tarea</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        ref={titleRef}
                        defaultValue={task.title}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                        defaultValue={task.description || ""}
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Guardar Cambios
                    </button>
                    <Link
                        to={`/task/${id}`}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};