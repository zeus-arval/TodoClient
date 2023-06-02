import {ITodoPriority} from "../../model/todoPriority";
import {TodoPriorityTableRow} from "./TodoPriorityTableRow";
import {HeaderRowCellData} from "../common/RowCell";

interface ITodoPrioritiesTableProps{
    todoPriorities: ITodoPriority[],
    deletePriority: (data: ITodoPriority) => Promise<void>,
    openUpdatePriorityDialog: (priority: ITodoPriority) => void,
}

export function TodoPrioritiesTable({todoPriorities, deletePriority, openUpdatePriorityDialog}: ITodoPrioritiesTableProps) {
    const updateHandler = (priority: ITodoPriority) => {
        openUpdatePriorityDialog(priority)
    }

    const deleteHandler = async (priority: ITodoPriority) => {
        await deletePriority(priority)
    }

    return (
        <div className='mt-12'>
            <div className='flex items-center justify-center'>
                <h1 className='text-2xl'>Priorities</h1>
            </div>
            <div className='mt-12'>
                <table className='w-full'>
                    <thead>
                    <tr className='flex flex-row justify-center'>
                        <HeaderRowCellData data='Priority Name' color='#D7DBE4' width='w-[40%]'/>
                        <HeaderRowCellData data='Priority Sort' color='#D7DBE4' width='w-[20%]'/>
                        <HeaderRowCellData data='Update / Delete' color='#D7DBE4' width='w-[35%]'/>
                    </tr>
                    </thead>
                    <tbody>
                    {todoPriorities?.map((c, index) =>
                        <TodoPriorityTableRow todoPriority={c} num={index} key={index} updatePriority={updateHandler}
                                              deletePriority={deleteHandler}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}