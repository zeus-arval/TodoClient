import {ITodoTask} from "../../model/todoTask";
import {HeaderRowCellData} from "../common/RowCell";
import {TodoTaskTableRow} from "./TodoTaskTableRow";
import {IShortenedCategory, ITodoCategory} from "../../model/todoCategory";
import {IShortenedPriority, ITodoPriority} from "../../model/todoPriority";

interface ITodoTasksTableProps{
    categories: IShortenedCategory[],
    priorities: IShortenedPriority[],
    todoTasks: ITodoTask[],
    deleteTask: (data: ITodoTask) => Promise<void>,
    openUpdateDialog: (task: ITodoTask) => void,
}

export function TodoTasksTable({categories, priorities, todoTasks, deleteTask, openUpdateDialog}: ITodoTasksTableProps) {
    const updateHandler = (task: ITodoTask) => {
        openUpdateDialog(task)
    }

    const deleteHandler = async (task: ITodoTask) => {
        await deleteTask(task)
    }

    return (
        <div className='mt-12'>
            <div className='flex items-center justify-center'>
                <h1 className='text-2xl'>Tasks</h1>
            </div>
            <div className='mt-12'>
                <table className='w-full'>
                    <thead>
                    <tr className='flex flex-row justify-center'>
                        <HeaderRowCellData data='Name' color='#D7DBE4' width='w-[20%]'/>
                        <HeaderRowCellData data='Status' color='#D7DBE4' width='w-[10%]'/>
                        <HeaderRowCellData data='Created' color='#D7DBE4' width='w-[10%]'/>
                        <HeaderRowCellData data='Due' color='#D7DBE4' width='w-[10%]'/>
                        <HeaderRowCellData data='Priority' color='#D7DBE4' width='w-[10%]'/>
                        <HeaderRowCellData data='Category' color='#D7DBE4' width='w-[10%]'/>
                        <HeaderRowCellData data='Sort' color='#D7DBE4' width='w-[5%]'/>
                        <HeaderRowCellData data='Update / Delete' color='#D7DBE4' width='w-[20%]'/>
                    </tr>
                    </thead>
                    <tbody>
                    {todoTasks?.map((t, index) =>
                        <TodoTaskTableRow categoryName={categories.find(c => c.id === t.todoCategoryId)?.categoryName ?? ''}
                                          priorityName={priorities.find(p => p.id === t.todoPriorityId)?.priorityName ?? ''}
                                          task={t}
                                          num={index}
                                          key={index}
                                          updateTask={updateHandler}
                                          deleteTask={deleteHandler}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}