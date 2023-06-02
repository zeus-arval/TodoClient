import {ITodoCategory} from "../../model/todoCategory";
import {RowCellData, RowCellUpdateDeleteButtons} from "../common/RowCell";

interface ITodoCategoryTableRowProps{
    todoCategory: ITodoCategory,
    num: number
    updateCategory: (category: ITodoCategory) => void,
    deleteCategory: (category: ITodoCategory) => void,
}

export function TodoCategoryTableRow({todoCategory, num, updateCategory, deleteCategory}: ITodoCategoryTableRowProps) {
    const color = num % 2 === 0 ? '#F0F2F6' : '#E9EEFA'

    return (
        <tr className='flex flex-row justify-center'>
            <RowCellData data={todoCategory.categoryName} color={color} width='w-[40%]'/>
            <RowCellData data={todoCategory.categorySort} color={color} width='w-[20%]'/>
            <RowCellUpdateDeleteButtons updateData={updateCategory} deleteData={deleteCategory} color={color}
                                        data={todoCategory} width='w-[35%]'/>
        </tr>
    )
}