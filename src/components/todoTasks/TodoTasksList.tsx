import {ITodoTask} from "../../model/todoTask";

interface ITodoTasksListProps{
    onUpdated: (todoTask: ITodoTask) => Promise<void>,
    todoTasks: ITodoTask[],
}

interface ITodoTaskListRowProps{
    onUpdated: (todoTask: ITodoTask) => Promise<void>,
    todoTask: ITodoTask,
}

export function TodoTasksList({todoTasks, onUpdated}: ITodoTasksListProps) {
    return (
        <>
            {todoTasks && <div className='bg-gray-200 px-4 py-2'>
                {todoTasks?.map((t, index) => <TodoTaskListRow key={index} onUpdated={onUpdated} todoTask={t}/>)}
            </div>}
        </>
    )
}

export function TodoTaskListRow({todoTask, onUpdated}: ITodoTaskListRowProps){
    const updateHandler = async () => {
        await onUpdated(todoTask)
    }

    return (
        <div className='m-1 bg-blue-300 p-1'>
            <div className='flex flex-row'>
                <input type='checkbox' onMouseUp={updateHandler} className=''/>
                <p>{todoTask.taskName}</p>
            </div>
        </div>
    )
}