import {useContext, useEffect, useState} from "react";
import {FetchContext} from "../context/FetchContext";
import {ITodoTask} from "../model/todoTask";

export const useTodoTask = () => {
    const {post, put, get, deleteData} = useContext(FetchContext)
    const [todoTasks, setTodoTasks] = useState(Array<ITodoTask>)
    const endPointName = 'TodoTasks'

    const addTask = async (todoTask: ITodoTask) => {
        let data = await post<ITodoTask>(todoTask, endPointName)!
        setTodoTasks(prev => [...prev, data])
    }

    const getTasks = async () => {
        const data = await get(endPointName)
        setTodoTasks(data)
    }

    const updateTask = async (task: ITodoTask) => {
        await put<ITodoTask>(task, task.id!, endPointName)
        setTodoTasks(prev => prev.map(c => {
                if(c.id === task.id){
                    return {
                        id: task.id,
                        taskName: task.taskName,
                        taskSort: task.taskSort,
                        createdDt: task.createdDt,
                        dueDt: task.dueDt,
                        isCompleted: task.isCompleted,
                        isArchived: task.isArchived,
                        todoCategoryId: task.todoCategoryId,
                        todoPriorityId: task.todoPriorityId,
                        syncDt: task.syncDt,
                    }
                }

                return c
            }).sort((a: ITodoTask, b: ITodoTask) => {
                if (a.taskSort > b.taskSort) return 1
                if (a.taskSort < b.taskSort) return -1
                if (a.taskName > b.taskName) return 1
                if (a.taskName < b.taskName) return -1
                return 0
            })
        )
    }

    const deleteTask = async (task: ITodoTask) => {
        setTodoTasks(prev => prev.filter(c => c.id !== task.id))
        await deleteData(task.id!, endPointName)
    }

    useEffect(() => {
        getTasks()
    }, [])

    return {todoTasks, addTask, getTasks, updateTask, deleteTask}
}