import {ITodoTask} from "../../../model/todoTask";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {IShortenedCategory} from "../../../model/todoCategory";
import {IShortenedPriority} from "../../../model/todoPriority";
import {convertStringToDate, formatServerDateToClientDate, getFormattedDateNow} from "../../../helpers/dateHelper";
import {formatTask} from "../../../helpers/taskHelper";
import {FormInput, FormSelect} from "../../common/Input";
import {ErrorComponent} from "../../ErrorComponent";
import {GreenButton} from "../../common/Button";

interface IUpdateTodoTaskProps{
    categories: IShortenedCategory[],
    priorities: IShortenedPriority[],
    onUpdated: (task: ITodoTask) => Promise<void>,
    task: ITodoTask,
}

export function UpdateTodoTask({categories, priorities, onUpdated, task}: IUpdateTodoTaskProps) {
    const [updatedTask, setUpdatedTask] = useState({
        ...task,
        todoCategoryId: categories.find(c => c.id === task.todoCategoryId)?.categoryName ?? '',
        todoPriorityId: priorities.find(p => p.id === task.todoPriorityId)?.priorityName ?? '',
    })
    const [deadline, setDeadline] = useState(formatServerDateToClientDate(task.dueDt!))
    const [nameError, setNameError] = useState('')
    const [deadlineError, setDeadlineError] = useState('')


    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        setNameError('')

        if (updatedTask.taskName.trim().length <= 1){
            setNameError('Length should be bigger than 1')
            return
        }

        if (!deadline){
            setDeadlineError('Deadline must be selected')
            return
        }

        let formattedTask = formatTask(deadline, updatedTask, categories, priorities)
        formattedTask.id = updatedTask.id
        await onUpdated(formattedTask)
    }

    const changeName = (event: ChangeEvent<any>) => {
        setUpdatedTask(prev => ({
            ...prev,
            taskName: event.target.value
        }))
    }

    const changeSort = (event: ChangeEvent<any>) => {
        setUpdatedTask(prev => ({
            ...prev,
            taskSort: event.target.value
        }))
    }

    const changeDeadline = (event: ChangeEvent<any>) => {
        setDeadline(event.target.value)
    }

    const changeCategoryId = (event: ChangeEvent<any>) => {
        setUpdatedTask(prev => ({
            ...prev,
            todoCategoryId: event.target.value
        }))
    }

    const changePriorityId = (event: ChangeEvent<any>) => {
        setUpdatedTask(prev => ({
            ...prev,
            todoPriorityId: event.target.value
        }))
    }

    return (<div>
            <form onSubmit={submitHandler}>
                <FormInput
                    title='Task Name'
                    onChange={changeName}
                    type='text'
                    value={updatedTask.taskName}/>
                {nameError && <ErrorComponent message={nameError}/>}

                <FormInput
                    title='Task Sort'
                    type='number'
                    value={updatedTask.taskSort}
                    onChange={changeSort}
                    condition={{'min': '1'}}/>

                <FormInput
                    title='Due Date'
                    onChange={changeDeadline}
                    type='date'
                    value={deadline}/>
                {deadlineError && <ErrorComponent message={deadlineError}/>}

                <FormSelect
                    title='Category'
                    onChange={changeCategoryId}
                    value={updatedTask.todoCategoryId}
                    options={categories.map(c => c.categoryName)}/>

                <FormSelect
                    title='Priority'
                    onChange={changePriorityId}
                    value={updatedTask.todoPriorityId}
                    options={priorities.map(c => c.priorityName)}/>

                <div className='flex justify-center mt-7 mb-12'>
                    <GreenButton type='submit' text='Create'/>
                </div>
            </form>
        </div>
    )
}