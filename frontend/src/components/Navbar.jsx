import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export const Navbar = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 p-4 mb-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* Enlace al Inicio */}
                <Link to="/" className="text-white text-lg font-bold hover:text-gray-300">
                    Task Manager
                </Link>

                {/* Enlaces de escritorio */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-white hover:text-gray-300">Inicio</Link>
                    <Link to="/new-task" className="text-white hover:text-gray-300">Nueva Tarea</Link>
                    <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full">
                        {user?.email}
                    </span>
                </div>

                {/* Botón menú móvil */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white focus:outline-none text-xl"
                >
                    ☰
                </button>
            </div>

            {/* Menú desplegable en móvil */}
            {isOpen && (
                <div className="md:hidden mt-3 pt-3 border-t border-gray-700 space-y-2">
                    <Link to="/" className="block text-white hover:text-gray-400">Inicio</Link>
                    <Link to="/new-task" className="block text-white hover:text-gray-400">Nueva Tarea</Link>
                    <span className="block text-gray-400 text-sm pt-2">{user?.email}</span>
                </div>
            )}
        </nav>
    );
};