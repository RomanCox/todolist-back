import mongoose from 'mongoose';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
    createDate: Date,
    updateDate: Date,
}

export type TodoListType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    //createDate: Date,
    createDate: string,
    //updateDate: Date,
    updateDate: string,
};

const todoListsSchema = new mongoose.Schema({
    title: String,
    tasks: Array<TaskType>,
    //createDate: Date,
    createDate: String,
    //updateDate: Date,
    updateDate: String
});

export const TodoListModel = mongoose.model('todoList', todoListsSchema);