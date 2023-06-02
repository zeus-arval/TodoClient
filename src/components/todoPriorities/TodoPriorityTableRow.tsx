import {ITodoPriority} from "../../model/todoPriority";
import {RowCellData, RowCellUpdateDeleteButtons} from "../common/RowCell";

interface ITodoPrioritiesTableRowProps{
    todoPriority: ITodoPriority,
    num: number
    updatePriority: (priority: ITodoPriority) => void,
    deletePriority: (priority: ITodoPriority) => void,
}

export function TodoPriorityTableRow({todoPriority, num, updatePriority, deletePriority}: ITodoPrioritiesTableRowProps) {
    const color = num % 2 === 0 ? '#F0F2F6' : '#E9EEFA'

    return (
        <tr className='flex flex-row justify-center'>
            <RowCellData color={color} data={todoPriority.priorityName} width='w-[40%]'/>
            <RowCellData color={color} data={todoPriority.prioritySort} width='w-[20%]'/>
            <RowCellUpdateDeleteButtons updateData={updatePriority} deleteData={deletePriority} color={color}
                                        data={todoPriority} width='w-[35%]'/>
        </tr>
    )
}