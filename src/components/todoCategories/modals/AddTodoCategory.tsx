import {ChangeEvent, FormEvent, useState} from "react";
import {ErrorComponent} from "../../ErrorComponent";
import {ITodoCategory} from "../../../model/todoCategory";
import {GreenButton} from "../../common/Button";
import {FormInput} from "../../common/Input";

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

                <FormInput
                    title='Category Name'
                    type='text'
                    value={todoCategory.categoryName}
                    onChange={changeCategoryName}/>

                {nameErrorMessage && <ErrorComponent message={nameErrorMessage}/>}

                <FormInput
                    title='Category Sort'
                    type='number'
                    value={todoCategory.categorySort}
                    onChange={changeCategorySort}
                    condition={{'min': '1'}}/>

                <div className='flex justify-center mt-7 mb-12'>
                    <GreenButton type='submit' text='Create'/>
                </div>
            </form>
        </div>
    )
}