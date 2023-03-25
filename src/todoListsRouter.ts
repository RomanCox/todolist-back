import express, {NextFunction, Request, Response} from 'express';
import {addTodo, deleteTodo, getTodo, getTodos, updateTodo} from './repository';

export const todoListsRouter = express.Router();

todoListsRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now());
    next();
})
todoListsRouter.get('', async (req: Request, res: Response) => {
    let todos = await getTodos();
    if (!!req.query.search) {
        let search = req.query.search.toString().toLowerCase();
        todos = todos.filter(todo => todo.title.toLowerCase().indexOf(search) > -1);
    }
    if (req.query.title) {
        const title = req.query.title.toString();
        res.send(todos.filter(todo => todo.title.indexOf(title) > -1));
    } else {
        res.send(todos);
    }
})
todoListsRouter.get('/:todoListId', async (req: Request, res: Response) => {
    const todo = await getTodo(req.params.todoListId);
    if (todo) {
        res.send(todo);
    } else {
        res.send(404);
    }
})
todoListsRouter.delete('/:todoListId', async (req: Request, res: Response) => {
    const result = await deleteTodo(req.params.todoListId);
    if (result) {
        res.send(204);
    } else {
        res.send(404);
    }
})
todoListsRouter.post('', async (req: Request, res: Response) => {
    const newTodo = await addTodo(req.body.title);
    res.status(201).send(newTodo);
})
todoListsRouter.put('/:todoListId', async (req: Request, res: Response) => {
    const updatedTodo = updateTodo(req.params.todoListId, req.body.title);
    if (updatedTodo) {
        res.send(updatedTodo);
    } else {
        res.send(404);
    }
})

// todoListsRouter.get('/:todoListId/tasks/:taskId', async (req: Request, res: Response) => {
//     try {
//         const task = await getTask(req.params.todoListId, req.params.taskId);
//         if (task) {
//             res.send(task)
//         } else {
//             res.send(404)
//         }
//     } catch (err) {
//         console.log(err)
//     }
// })
//
// todoListsRouter.delete('/:todoListId/tasks/:taskId', async (req: Request, res: Response) => {
//     const result = await deleteTask(req.params.todoListId, req.params.taskId);
//     if (result) {
//         res.send(204)
//     } else {
//         res.send(404)
//     }
// })