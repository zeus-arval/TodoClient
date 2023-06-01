import {ITodoCategory} from "../../../model/todoCategory";
import {ChangeEvent, FormEvent, useState} from "react";
import {ErrorComponent} from "../../ErrorComponent";

interface IUpdateTodoCategoryProps{
    onUpdated: (todoCategory: ITodoCategory) => Promise<void>,
    todoCategory: ITodoCategory,
}

export function UpdateTodoCategory({onUpdated, todoCategory}: IUpdateTodoCategoryProps) {
    const [updatedCategory, setUpdatedCategory] = useState(todoCategory)
    const [nameErrorMessage, setNameErrorMessage] = useState('')

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()

        if (updatedCategory.categoryName.trim().length <= 1){
            setNameErrorMessage('Length should ve bigger than 1')
        }

        await onUpdated(updatedCategory)
    }

    const changeCategoryName = (event: ChangeEvent<any>) => {
        setUpdatedCategory(prev => ({
            ...prev,
            categoryName: event.target.value,
        }))
    }

    const changeCategorySort = (event: ChangeEvent<any>) => {
        setUpdatedCategory(prev =>
            ({
                ...prev,
                categorySort: event.target.value
            })
        )
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <p className='text-left'>Category Name:</p>
                <input
                    type='text'
                    className='border py-2 px-4 mb-2 w-full outline-0'
                    value={updatedCategory.categoryName}
                    onChange={changeCategoryName}
                />
                {nameErrorMessage && <ErrorComponent message={nameErrorMessage}/>}
                <p className='text-left'>Category Sort:</p>
                <input
                    type='number'
                    className='border py-2 px-4 mb-2 w-full outline-0'
                    value={updatedCategory.categorySort}
                    min='1'
                    onChange={changeCategorySort}
                />

                <div className='flex justify-center mt-7 mb-12'>
                    <button
                        type='submit'
                        className='rounded-xl py-3 px-14 font-bold bg-pastel-green-100 hover:bg-pastel-green-200 text-white'
                    >Update</button>
                </div>
            </form>
        </div>
    )
}