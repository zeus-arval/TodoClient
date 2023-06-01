import {ITodoCategory} from "../../model/todoCategory";

interface TodoCategoryTableRowProps{
    todoCategory: ITodoCategory,
    num: number
    updateCategory: (category: ITodoCategory) => void,
    deleteCategory: (category: ITodoCategory) => void,
}

export function TodoCategoryTableRow({todoCategory, num, updateCategory, deleteCategory}: TodoCategoryTableRowProps) {
    const color = num % 2 === 0 ? '#F0F2F6' : '#E9EEFA'

    return (
        <tr className='flex flex-row justify-center'>
            <td className='h-14 w-[40%] bg-gray-200 m-1 flex items-center px-4' style={{backgroundColor:color}}>
                {todoCategory.categoryName}
            </td>
            <td className='h-14 w-[20%] bg-gray-200 m-1 flex items-center px-4' style={{backgroundColor:color}}>
                {todoCategory.categorySort}
            </td>
            <td className='h-14 w-[35%] bg-gray-200 m-1 flex items-center px-4 justify-center' style={{backgroundColor:color}}>
                <div className='flex flex-row justify-center'>
                    <button
                        className='mx-5 bg-sky-600 rounded px-8 py-1 text-white'
                        onClick={() => updateCategory(todoCategory)}>
                        Update
                    </button>
                    <button
                        className='mx-5 bg-red-500 rounded px-8 py-1 text-white'
                        onClick={() => deleteCategory(todoCategory)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}