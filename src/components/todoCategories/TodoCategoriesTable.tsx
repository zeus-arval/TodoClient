import {TodoCategoryTableRow} from "./TodoCategoryTableRow";
import {ITodoCategory} from "../../model/todoCategory";
import {HeaderRowCellData} from "../common/RowCell";

interface ITodoCategoriesTableProps{
    todoCategories: ITodoCategory[],
    deleteCategory: (data: ITodoCategory) => Promise<void>,
    openUpdateCategoryDialog: (category: ITodoCategory) => void,
}

export function TodoCategoriesTable({todoCategories, deleteCategory, openUpdateCategoryDialog}: ITodoCategoriesTableProps) {
    const updateHandler = (category: ITodoCategory) => {
        openUpdateCategoryDialog(category)
    }

    const deleteHandler = async (category: ITodoCategory) => {
        await deleteCategory(category)
    }

    return (
        <div className='mt-12'>
            <div className='flex items-center justify-center'>
                <h1 className='text-2xl'>Categories</h1>
            </div>
            <div className='mt-12'>
                <table className='w-full'>
                    <thead>
                        <tr className='flex flex-row justify-center'>
                            <HeaderRowCellData data='Category Name' color='#D7DBE4' width='w-[40%]'/>
                            <HeaderRowCellData data='Category Sort' color='#D7DBE4' width='w-[20%]'/>
                            <HeaderRowCellData data='Update / Delete' color='#D7DBE4' width='w-[35%]'/>
                        </tr>
                    </thead>
                    <tbody>
                        {todoCategories?.map((c, index) => <TodoCategoryTableRow
                            todoCategory={c} num={index} key={index} updateCategory={updateHandler} deleteCategory={deleteHandler}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}