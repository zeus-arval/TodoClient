import {ITodoTask} from "../../model/todoTask";
import {useTodoTask} from "../../hooks/todoTask";

interface ITodoTaskListRowProps{
    onUpdated: (todoTask: ITodoTask) => Promise<void>,
    todoTask: ITodoTask,
}

export function TodoTasksList() {
    const {todoTasks, updateTask} = useTodoTask()
    const filteredTodoTasks = todoTasks.filter(t => !t.isCompleted)

    const updateTaskStatus = async (todoTask: ITodoTask) => {
        todoTask.isCompleted = true
        await updateTask(todoTask)
    }

    return (
        <>
            <div className='mt-32'>
                {filteredTodoTasks.length > 0 && <div>
                    <p className='text-center text-3xl'>Todo List</p>
                    <div className='bg-gray-200 px-4 py-2 mt-6'>
                        {filteredTodoTasks?.map((t, index) => <TodoTaskListRow key={index} onUpdated={updateTaskStatus} todoTask={t}/>)}
                    </div>
                </div>}
            </div>
        </>
    )
}

export function TodoTaskListRow({todoTask, onUpdated}: ITodoTaskListRowProps){
    const updateHandler = async () => {
        await onUpdated(todoTask)
    }

    return (
        <div className='m-1 bg-blue-300 py-3 px-5 active:bg-blue-400'>
            <div className='flex flex-row' onMouseUp={updateHandler} >
                <p className='text-white text-2xl'>{todoTask.taskName}</p>
            </div>
        </div>
    )
}