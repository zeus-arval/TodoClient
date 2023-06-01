import {ChangeEvent, FormEvent, useState} from "react";
import {ErrorComponent} from "../../ErrorComponent";
import {ITodoCategory} from "../../../model/todoCategory";

interface IAddTodoCategoryProps{
    onCreated: (todoCategory: ITodoCategory) => Promise<any>,
}

export function AddTodoCategory({onCreated}: IAddTodoCategoryProps) {
    const [todoCategory, setTodoCategory] = useState<ITodoCategory>({
        categoryName: '',
        categorySort: 1,
    })

    const [nameErrorMessage, setNameErrorMessage] = useState('')

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        setNameErrorMessage('')

        if (todoCategory.categoryName.trim().length <= 1){
            setNameErrorMessage('Length should be bigger than 1')
            return
        }

        await onCreated(todoCategory)
    }

    const changeCategoryName = (event: ChangeEvent<any>) => {
        setTodoCategory(prev =>
            ({
                ...prev,
                categoryName: event.target.value
            })
        )
    }

    const changeCategorySort = (event: ChangeEvent<any>) => {
        setTodoCategory(prev =>
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
                    value={todoCategory.categoryName}
                    onChange={changeCategoryName}
                />
                {nameErrorMessage && <ErrorComponent message={nameErrorMessage}/>}
                <p className='text-left'>Category Sort:</p>
                <input
                    type='number'
                    className='border py-2 px-4 mb-2 w-full outline-0'
                    value={todoCategory.categorySort}
                    min='1'
                    onChange={changeCategorySort}
                />

                <div className='flex justify-center mt-7 mb-12'>
                    <button
                        type='submit'
                        className='rounded-xl py-3 px-14 font-bold bg-pastel-green-100 hover:bg-pastel-green-200 text-white'
                    >Create</button>
                </div>
            </form>
        </div>
    )
}