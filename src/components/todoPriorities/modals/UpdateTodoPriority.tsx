import {ITodoPriority} from "../../../model/todoPriority";
import {ChangeEvent, FormEvent, useState} from "react";
import {ErrorComponent} from "../../ErrorComponent";
import {GreenButton} from "../../common/Button";
import {FormInput} from "../../common/Input";

interface IUpdateTodoPriorityProps{
    onUpdated: (todoPriority: ITodoPriority) => Promise<void>,
    todoPriority: ITodoPriority,
}


export function UpdateTodoPriority({onUpdated, todoPriority}: IUpdateTodoPriorityProps) {
    const [updatedPriority, setUpdatedPriority] = useState<ITodoPriority>(todoPriority)
    const [nameErrorMessage, setNameErrorMessage] = useState('')

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()

        if (updatedPriority.priorityName.trim().length <= 1){
            setNameErrorMessage('Length should ve bigger than 1')
        }

        await onUpdated(updatedPriority)
    }

    const changePriorityName = (event: ChangeEvent<any>) => {
        setUpdatedPriority(prev => ({
            ...prev,
            priorityName: event.target.value,
        }))
    }

    const changePrioritySort = (event: ChangeEvent<any>) => {
        setUpdatedPriority(prev =>
            ({
                ...prev,
                prioritySort: event.target.value
            })
        )
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <FormInput
                    title='Priority Name'
                    type='text'
                    value={updatedPriority.priorityName}
                    onChange={changePriorityName}/>
                {nameErrorMessage && <ErrorComponent message={nameErrorMessage}/>}

                <FormInput
                    title='Priority Sort'
                    type='number'
                    value={updatedPriority.prioritySort}
                    onChange={changePrioritySort}
                    condition={{'min': '1'}}/>

                <div className='flex justify-center mt-7 mb-12'>
                    <GreenButton type='submit' text='Update'/>
                </div>
            </form>
        </div>
    )
}