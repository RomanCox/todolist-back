import express, {Request, Response} from 'express';
import {v4 as uuid} from 'uuid';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 5000;

const todoLists = [{id: '1', title: 'first todo'}, {id: '2', title: 'second todo'}];

const parserMiddleware = bodyParser();
app.use(parserMiddleware)

app.get('/todolists', (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title.toString()
        res.send(todoLists.filter(todo => todo.title.indexOf(title) > -1))
    } else {
        res.send(todoLists)
    }
})
app.get('/todolists/:todoListId', (req: Request, res: Response) => {
    let todoList = todoLists.find(todo => todo.id === req.params.todoListId)
    if (todoList) {
        res.send(todoList)
    } else {
        res.send(404)
    }
})
app.delete('/todolists/:todoListId', (req: Request, res: Response) => {
    for (let i = 0; i < todoLists.length; i++) {
        if (todoLists[i].id === req.params.todoListId) {
            todoLists.splice(i, 1)
            res.send(204)
            return
        }
    }

    res.send(404)
})
app.post('/todolists', (req: Request, res: Response) => {
    const newTodo = {id: uuid(), title: req.body.title};
    todoLists.push(newTodo)
    res.status(201).send(newTodo)
})
app.put('/todolists/:todoListId', (req: Request, res: Response) => {
    let todoList = todoLists.find(todo => todo.id === req.params.todoListId)
    if (todoList) {
        todoList.title = req.body.title;
        res.send(todoList)
    } else {
        res.send(404)
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})