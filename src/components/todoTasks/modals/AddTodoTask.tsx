import {ITodoTask} from "../../../model/todoTask";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {ErrorComponent} from "../../ErrorComponent";
import {GreenButton} from "../../common/Button";
import {FormSelect, FormInput} from "../../common/Input";
import {IShortenedCategory, ITodoCategory} from "../../../model/todoCategory";
import {IShortenedPriority, ITodoPriority} from "../../../model/todoPriority";
import {convertStringToDate, getFormattedDateNow} from "../../../helpers/dateHelper";
import {formatTask} from "../../../helpers/taskHelper";

interface IAddTodoTaskProps{
    onCreated: (task: ITodoTask) => Promise<void>,
    categories: IShortenedCategory[],
    priorities: IShortenedPriority[],
}

export function AddTodoTask({categories, priorities, onCreated}: IAddTodoTaskProps) {
    const [deadline, setDeadline] = useState('')
    const [nameError, setNameError] = useState('')
    const [deadlineError, setDeadlineError] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [priorityError, setPriorityError] = useState('')

    const [task ,setTask] = useState<ITodoTask>({
        id: '',
        taskName: '',
        taskSort: 1,
        createdDt: Date.now().toString(),
        dueDt: '',
        todoCategoryId: categories[0]?.categoryName ?? '',
        todoPriorityId: priorities[0]?.priorityName ?? '',
        isCompleted: false,
        isArchived: false,
        syncDt: '',
    })

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        setNameError('')

        if (task.taskName.trim().length <= 1){
            setNameError('Length should be bigger than 1')
            return
        }

        if (!deadline){
            setDeadlineError('Deadline must be selected')
            return
        }

        let formattedTask = formatTask(deadline, task, categories, priorities)
        await onCreated(formattedTask)
    }

    const changeName = (event: ChangeEvent<any>) => {
        setTask(prev => ({
            ...prev,
            taskName: event.target.value
        }))
    }

    const changeSort = (event: ChangeEvent<any>) => {
        setTask(prev => ({
            ...prev,
            taskSort: event.target.value
        }))
    }

    const changeDeadline = (event: ChangeEvent<any>) => {
        setDeadline(event.target.value)
    }

    const changeCategoryId = (event: ChangeEvent<any>) => {

        setTask(prev => ({
            ...prev,
            todoCategoryId: event.target.value
        }))
    }

    const changePriorityId = (event: ChangeEvent<any>) => {
        setTask(prev => ({
            ...prev,
            todoPriorityId: event.target.value
        }))
    }

    useEffect(() => {
        if (categories.length === 0){
            setCategoryError('Categories should be created')
        }
    }, [categories])

    useEffect(() => {
        if (priorities.length === 0){
            setPriorityError('Priorities should be created')
        }
    }, [priorities])

    return (
        <div>
            <form onSubmit={submitHandler}>
                <FormInput
                    title='Task Name'
                    onChange={changeName}
                    type='text'
                    value={task.taskName}/>
                {nameError && <ErrorComponent message={nameError}/>}

                <FormInput
                    title='Task Sort'
                    type='number'
                    value={task.taskSort}
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
                    value={task.todoCategoryId}
                    options={categories.map(c => c.categoryName)}/>
                {categoryError && <ErrorComponent message={categoryError}/>}

                <FormSelect
                    title='Priority'
                    onChange={changePriorityId}
                    value={task.todoPriorityId}
                    options={priorities.map(c => c.priorityName)}/>
                {priorityError && <ErrorComponent message={priorityError}/>}

                <div className='flex justify-center mt-7 mb-12'>
                    <GreenButton type='submit' text='Create'/>
                </div>
            </form>
        </div>
    )
}