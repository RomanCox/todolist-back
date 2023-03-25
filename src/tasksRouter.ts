import express, {NextFunction, Request, Response} from 'express';
import {addTask, deleteTask, getTask, getTasks, updateTask} from './repository';
export const tasksRouter = express.Router();

tasksRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now());
    next();
})
tasksRouter.get('', async (request: Request, response: Response) => {
    let tasks = await getTasks(request.body.todoListId);
    if (!!request.query.search) {
        let search = request.query.search.toString().toLowerCase();
        tasks = tasks.filter(task => task.title.toLowerCase().indexOf(search) > -1);
    }
    if (request.query.title) {
        const title = request.query.title.toString();
        response.send(tasks.filter(task => task.title.indexOf(title) > -1));
    } else {
        response.send(tasks)
    }
})

tasksRouter.get('/:taskId', async (request: Request, response: Response) => {
    try {
        const task = await getTask(request.params.todoListId, request.params.taskId);
        if (task) {
            response.send(task)
        } else {
            response.send(404)
        }
    } catch (err) {
        console.log(err)
    }
})
tasksRouter.delete('/:taskId', async (request: Request, response: Response) => {
    const result = await deleteTask(request.body.todoListId, request.params.taskId);
    if (result) {
        response.send(204);
    } else {
        response.send(404);
    }
    try {
        await deleteTask(request.body.todoListId, request.params.taskId)
            .then(() => {
                response.send(204)
            })
    } catch (err) {
        console.log(err)
    }
})
tasksRouter.post('', async (request: Request, response: Response) => {
    let newTask = await addTask(request.body.todoListId, request.body.title);
    response.status(201).send(newTask);
})
tasksRouter.put('/:taskId', async (request: Request, response: Response) => {
    try {
        const updatedTask = updateTask(request.body.todoListId, request.params.taskId, request.body.title);
        updatedTask.then(res => {
                response.send(res);
            })
    } catch(err) {
        console.log(err)
    }
})