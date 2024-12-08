import Task from '../models/Task.js';
import TaskType from '../models/TaskType.js';

const index = async (req, res) => {    
    const tasks = await Task.find();
    res.status(200).json(tasks);
};

const show = async (req, res) => {  
    // Implementation for showing a single task by ID
};

const insert = async (req, res) => {
    const { name } = req.body;
    try {
        const type = await TaskType.findOne({ name: "New" });
        if (!type) {
            return res.status(400).json({ message: 'Task type not found' });
        }
        
        const newTask = await Task.create({
            type_id: type._id,
            name: name,
        });

        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error creating a task:', err);
        res.status(400).send(err);
    }
};

const update = async (req, res) => {
    const { id } = req.params; // Get the task ID from the request parameters
    const updates = req.body; // Get the updates from the request body

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(400).send(err);
    }
};

const remove = async (req, res) => {
    const { id } = req.params; // Get the task ID from the request parameters

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(400).send(err);
    }
};

export const TaskController = { index, show, insert, update, remove };