import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks/${id}`)
            .then((response) => response.json())
            .then((data) => setTask(data))
            .catch((error) => console.error("Error fetching task:", error));
    }, [id]);

    if (!task) {
        return <div className="text-center mt-10 text-gray-500">Cargando detalle...</div>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <p className="text-gray-700 mb-4">{task.description || "Sin descripción disponible."}</p>

            <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {task.completed ? 'Completada' : 'Pendiente'}
                </span>
            </div>

            <div className="flex gap-3 border-t pt-4">
                <Link
                    to={`/edit/${id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Editar Tarea
                </Link>
                <Link
                    to="/"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Volver
                </Link>
            </div>
        </div>
    );
};