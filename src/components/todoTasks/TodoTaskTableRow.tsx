import {ITodoPriority} from "../../model/todoPriority";
import {ITodoTask} from "../../model/todoTask";
import {RowCellData, RowCellUpdateDeleteButtons} from "../common/RowCell";
import {formatDate} from "../../helpers/dateHelper";

interface ITodoTaskTableRowProps{
    categoryName: string,
    priorityName: string,
    task: ITodoTask,
    num: number
    updateTask: (task: ITodoTask) => void,
    deleteTask: (task: ITodoTask) => void,
}

export function TodoTaskTableRow({categoryName, priorityName, task, num, updateTask, deleteTask}: ITodoTaskTableRowProps) {
    const color = num % 2 === 0 ? '#F0F2F6' : '#E9EEFA'

    return (
        <tr className='flex flex-row justify-center'>
            <RowCellData color={color} data={task.taskName} width='w-[20%]'/>
            <RowCellData color={color} data={task.isCompleted ? 'DONE' : 'IN PROGRESS'} width='w-[10%]'/>
            <RowCellData color={color} data={formatDate(task.createdDt)} width='w-[10%]'/>
            <RowCellData color={color} data={formatDate(task.dueDt ?? '')} width='w-[10%]'/>
            <RowCellData color={color} data={priorityName} width='w-[10%]'/>
            <RowCellData color={color} data={categoryName} width='w-[10%]'/>
            <RowCellData color={color} data={task.taskSort} width='w-[5%]'/>
            <RowCellUpdateDeleteButtons updateData={updateTask} deleteData={deleteTask} color={color}
                                        data={task} width='w-[20%]'/>
        </tr>
    )
}