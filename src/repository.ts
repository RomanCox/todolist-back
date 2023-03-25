import {v4 as uuid} from 'uuid';
import {TaskType, TodoListType} from './';

const fs = require('fs');

export const getTodos = (): Promise<Array<TodoListType>> => {
    return new Promise((resolve, reject) => {
        fs.readFile("todoLists.json", function (err: (NodeJS.ErrnoException | null), buf: Buffer) {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(buf.toString()));
            }
        });
    })
}

export const getTodo = async (todoListId: string): Promise<TodoListType> => {
    const todos = await getTodos();

    return new Promise((resolve, reject) => {
        const todo = todos.find(todo => todo.id === todoListId)
        if (todo) {
            resolve(todo)
        } else {
            reject('Don`t find todo')
        }
    })
}

export const deleteTodo = async (todoListId: string): Promise<boolean> => {
    const todos = await getTodos();
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todoListId) {
            todos.splice(i, 1)
        }
    }

    return new Promise((resolve, reject) => {
        fs.writeFile("todoLists.json", JSON.stringify(todos), (err: any) => {
            if (err) {
                reject(err)
            }
            if (todos.length !== todos.length) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

export const addTodo = async (title: string): Promise<TodoListType> => {
    const todos = await getTodos();
    //const newTodo = {id: uuid(), title, createDate: new Date().toString(), updateDate: ''};
    const newTodo = {id: uuid(), title, tasks: []};

    return new Promise((resolve, reject) => {
        todos.push(newTodo);
        fs.writeFile("todoLists.json", JSON.stringify(todos), (err: any) => {
            if (err) {
                reject(err)
            }
            resolve(newTodo);
        });
    })
}

export const updateTodo = async (todoListId: string, title: string): Promise<TodoListType> => {
    const todos = await getTodos();
    const todo = todos.find(todo => todo.id === todoListId);
    if (todo) {
        todo.title = title;
    }

    return new Promise((resolve, reject) => {
        fs.writeFile("todoLists.json", JSON.stringify(todos), (err: any) => {
            if (todo) {
                resolve(todo)
            } else {
                reject(err)
            }
        })
    })
}

export const getTasks = async (todoListId: string): Promise<Array<TaskType>> => {
    const todoLists = await getTodos();
    const todo = todoLists.find(todo => todo.id === todoListId);

    return new Promise((resolve, reject) => {
        if (todo) {
            resolve(todo.tasks);
        } else {
            reject('Don`t find TodoList')
        }
    })
}

export const getTask = async (todoListId: string, taskId: string): Promise<TaskType> => {
    const tasks = await getTasks(todoListId);

    return new Promise((resolve, reject) => {
        if (tasks) {
            const task = tasks.find(task => task.id === taskId)
            if (task) {
                resolve(task);
            } else {
                reject('Don`t find Task');
            }

        } else {
            reject('Don`t find TodoList');
        }
    })
}

export const deleteTask = async (todoListId: string, taskId: string): Promise<boolean> => {
    const todoLists = await getTodos();
    const todo = todoLists.find(todo => todo.id === todoListId);

    return new Promise((resolve, reject) => {
        if (todo) {
            let tasks = todo.tasks.filter(task => task.id !== taskId)
            todo.tasks = tasks;
            fs.writeFile("todoLists.json", JSON.stringify(todoLists), (err: any) => {
                if (err) {
                    reject(err);
                }
                if (tasks.length !== todo.tasks.length) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        }
    })
}

export const addTask = async (todoListId: string, title: string): Promise<TaskType> => {
    const todoLists = await getTodos();
    const todo = todoLists.find(todo => todo.id === todoListId);
    const newTask = {id: uuid(), title: title, isDone: false, createDate: new Date(), updateDate: null};
    return new Promise((resolve, reject) => {
        if (todo) {
            todo.tasks.push(newTask)
            console.log(todo)
            fs.writeFile("todoLists.json", JSON.stringify(todoLists), (err: any) => {
                if (err) {
                    reject(err)
                }
                resolve(newTask);
            });
        } else {
            reject('Don`t find TodoList')
        }
    })
}

export const updateTask = async (todoListId: string, taskId: string, title: string): Promise<TaskType> => {
    const todoLists = await getTodos();
    const todo = todoLists.find(todo => todo.id === todoListId);

    return new Promise((resolve, reject) => {
        if (todo) {
            const task = todo.tasks.find(task => task.id === taskId);
            if (task) {
                task.title = title;
                fs.writeFile("todoLists.json", JSON.stringify(todoLists), (err: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(task);
                    }
                })
            } else {
                reject('Don`t find Task')
            }
        } else {
            reject('Don`t find TodoList')
        }
    })
}