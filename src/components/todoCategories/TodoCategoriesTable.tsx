import {TodoCategoryTableRow} from "./TodoCategoryTableRow";
import {ITodoCategory} from "../../model/todoCategory";

interface ITodoCategoriesTableProps{
    todoCategories: ITodoCategory[],
    deleteCategory: (data: ITodoCategory) => Promise<void>,
    openUpdateCategoryDialog: (category: ITodoCategory) => void,
}

export function TodoCategoriesTable({todoCategories, deleteCategory, openUpdateCategoryDialog}: ITodoCategoriesTableProps) {

    const updateHandler = (category: ITodoCategory) => {
        console.log('open')
        openUpdateCategoryDialog(category)
    }

    const deleteHandler = async (category: ITodoCategory) => {
        await deleteCategory(category)
    }

    return (
        <div className='mt-24'>
            <table className='w-full'>
                <thead>
                    <tr className='flex flex-row justify-center'>
                        <th className='h-14 w-[40%] bg-gray-200 m-1 flex items-center px-4'
                            style={{backgroundColor: '#D7DBE4'}}>
                            Category name
                        </th>
                        <th className='h-14 w-[20%] bg-gray-200 m-1 flex items-center px-4'
                            style={{backgroundColor: '#D7DBE4'}}>
                            Category sort
                        </th>
                        <th className='h-14 w-[35%] bg-gray-200 m-1 flex items-center px-4'
                            style={{backgroundColor: '#D7DBE4'}}>
                            Update / Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {todoCategories?.map((c, index) => <TodoCategoryTableRow
                        todoCategory={c} num={index} key={index} updateCategory={updateHandler} deleteCategory={deleteHandler}/>)}
                </tbody>
            </table>
        </div>
    )
}