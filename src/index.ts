import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {todoListsRouter} from './todoListsRouter';
import {tasksRouter} from './tasksRouter';

const app = express();

const port = process.env.PORT || 5000;

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
    createDate: Date | null,
    updateDate: Date | null,
}

export type TodoListType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
};

const corsOptions = {
    origin: 'localhost',
    optionsSuccessStatus: 200
}

const parserMiddleware = bodyParser();
app.use(parserMiddleware)
    .use(cors(corsOptions))
    .use('/todolists', todoListsRouter)
    .use('/todolists/:todoListId/tasks', tasksRouter)

app.use((req: Request, res: Response) => {
    res.send(404)
})

app.listen(port, () => {
    console.log(`TodoLists app listening on port ${port}`)
})