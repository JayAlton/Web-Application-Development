import express from 'express';
import {TaskController} from '../app/controllers/TaskController.js';
import {TaskTypeController} from '../app/controllers/TaskTypeController.js';

const router = express.Router();

//Task routes
router.get('/tasks', TaskController.index);
router.get('/tasks', TaskController.insert);
router.get('/tasks', TaskController.show);
router.get('tasks', TaskController.update);
router.get('/tasks', TaskController.remove);

//Task Type routes
router.get('/task-types', TaskTypeController.index);

export default router;