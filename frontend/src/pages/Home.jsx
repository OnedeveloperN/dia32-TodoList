import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const Home = () => {
    const { user } = useUser();
    const [tasks, setTasks] = useState([]);
    // Estado para el filtro: 'all' | 'completed' | 'pending'
    const [filter, setFilter] = useState("all");

    // 1. Cargar las tareas desde la API al montar el componente
    useEffect(() => {
        fetch("http://localhost:3000/api/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

    // 2. Alternar estado completada / pendiente (PUT)
    const toggleComplete = async (taskToToggle) => {
        const updatedStatus = !taskToToggle.completed;

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${taskToToggle.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: updatedStatus }),
            });

            if (!response.ok) throw new Error("Error al actualizar estado");

            const updatedTask = await response.json();

            // Actualizamos la lista local en el estado (useState)
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    // 3. Eliminar tarea (DELETE)
    const deleteTask = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar la tarea");

            // Filtramos la tarea eliminada del estado local (useState)
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    // 4. Lógica de filtrado en memoria
    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true; // 'all'
    });

    return (
        <div className="max-w-3xl mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Lista de Tareas</h1>
                    <p className="text-gray-600 text-sm">Usuario: {user?.email}</p>
                </div>
                <Link
                    to="/new-task"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    + Nueva Tarea
                </Link>
            </header>

            {/* BARRA DE FILTROS */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-2 rounded-lg">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "all"
                            ? "bg-white text-indigo-600 shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                >
                    Todas ({tasks.length})
                </button>
                <button
                    onClick={() => setFilter("pending")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "pending"
                            ? "bg-white text-indigo-600 shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                >
                    Pendientes ({tasks.filter((t) => !t.completed).length})
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "completed"
                            ? "bg-white text-indigo-600 shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                >
                    Completadas ({tasks.filter((t) => t.completed).length})
                </button>
            </div>

            {/* LISTADO DE TAREAS */}
            {filteredTasks.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">No hay tareas para mostrar en este filtro.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {filteredTasks.map((task) => (
                        <li
                            key={task.id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(task)}
                                    className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                />
                                <Link
                                    to={`/task/${task.id}`}
                                    className={`text-lg font-medium truncate hover:text-indigo-600 ${task.completed
                                            ? "line-through text-gray-400"
                                            : "text-gray-800"
                                        }`}
                                >
                                    {task.title}
                                </Link>
                            </div>

                            {/* ACCIONES DE CADA TAREA */}
                            <div className="flex items-center gap-2">
                                <Link
                                    to={`/edit/${task.id}`}
                                    className="text-gray-500 hover:text-indigo-600 px-2 py-1 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-700 px-2 py-1 text-sm font-medium border border-red-200 rounded hover:bg-red-50"
                                >
                                    Borrar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};