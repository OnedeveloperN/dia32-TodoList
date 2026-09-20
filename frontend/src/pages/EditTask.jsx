import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const EditTask = () => {
    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [task, setTask] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTask(data);
                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description || "";
            })
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
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
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
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        ref={descriptionRef}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};