import {ITodoPriority} from "../../../model/todoPriority";
import {ChangeEvent, FormEvent, useState} from "react";
import {ErrorComponent} from "../../ErrorComponent";
import {GreenButton} from "../../common/Button";
import {FormInput} from "../../common/Input";

interface IAddTodoPriorityProps{
    onCreated: (todoPriority: ITodoPriority) => Promise<any>,
}

export function AddTodoPriority({onCreated}: IAddTodoPriorityProps) {
    const [priority, setPriority] = useState<ITodoPriority>({
        priorityName: '',
        prioritySort: 1,
    })
    const [nameErrorMessage, setNameErrorMessage] = useState('')

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        setNameErrorMessage('')

        if (priority.priorityName.trim().length <= 1){
            setNameErrorMessage('Length should be bigger than 1')
            return
        }

        await onCreated(priority)
    }

    const changePriorityName = (event: ChangeEvent<any>) => {
        setPriority(prev =>
            ({
                ...prev,
                priorityName: event.target.value
            })
        )
    }

    const changePrioritySort = (event: ChangeEvent<any>) => {
        setPriority(prev =>
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
                    value={priority.priorityName}
                    onChange={changePriorityName}/>
                {nameErrorMessage && <ErrorComponent message={nameErrorMessage}/>}

                <FormInput
                    title='Priority Sort'
                    type='number'
                    value={priority.prioritySort}
                    onChange={changePrioritySort}
                    condition={{'min': '1'}}/>

                <div className='flex justify-center mt-7 mb-12'>
                    <GreenButton type='submit' text='Create'/>
                </div>
            </form>
        </div>
    )
}