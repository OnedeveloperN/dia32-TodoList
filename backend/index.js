import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

let task = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
    { id: 4, title: 'Task 4', completed: true },
    { id: 5, title: 'Task 5', completed: false },
    { id: 6, title: 'Task 6', completed: true },
    { id: 7, title: 'Task 7', completed: false },
    { id: 8, title: 'Task 8', completed: true },
    { id: 9, title: 'Task 9', completed: false },
    { id: 10, title: 'Task 10', completed: true },
];

app.get('/api/tasks', (req, res) => {
    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const foundTask = task.find((t) => t.id === parseInt(id));

    if (!foundTask) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(foundTask);
});

// Crear una NUEVA tarea
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;

    const newTask = {
        id: Date.now(), // ID único temporal
        title,
        description: description || '',
        completed: false
    };

    task.push(newTask);
    res.status(201).json(newTask);
});

// EDITAR una tarea
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const taskIndex = task.findIndex((t) => t.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    task[taskIndex] = {
        ...task[taskIndex],
        title: title !== undefined ? title : task[taskIndex].title,
        description: description !== undefined ? description : task[taskIndex].description,
        completed: completed !== undefined ? completed : task[taskIndex].completed
    };

    res.json(task[taskIndex]);
});

// ELIMINAR una tarea
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = task.length;

    // Filtramos para quitar la tarea
    const filteredTasks = task.filter((t) => t.id !== parseInt(id));

    if (filteredTasks.length === initialLength) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Actualizamos el array original
    task = filteredTasks;

    res.json({ message: 'Tarea eliminada correctamente' });
});

export default app;