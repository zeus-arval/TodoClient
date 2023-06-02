import {useContext, useState} from "react";
import {ModalContext} from "../context/ModalContext";
import {useTodoTask} from "../hooks/todoTask";
import {ITodoTask} from "../model/todoTask";
import {Modal} from "../components/Modal";
import {TodoTasksTable} from "../components/todoTasks/TodoTasksTable";
import {GreenButton} from "../components/common/Button";
import {AddTodoTask} from "../components/todoTasks/modals/AddTodoTask";
import {UpdateTodoTask} from "../components/todoTasks/modals/UpdateTodoTask";
import {useTodoCategories} from "../hooks/todoCategory";
import {useTodoPriorities} from "../hooks/todoPriority";
import {IShortenedCategory} from "../model/todoCategory";
import {IShortenedPriority} from "../model/todoPriority";

export function TodoTasksPage() {
    const {modal, open, close} = useContext(ModalContext)
    const {todoTasks, addTask, deleteTask, updateTask} = useTodoTask()
    const {todoCategories} = useTodoCategories()
    const {todoPriorities} = useTodoPriorities()
    const [updateDialogIsOpened, setUpdateDialogIsOpened] = useState(false)
    const categories: IShortenedCategory[] = todoCategories.map(c => ({id: c.id, categoryName: c.categoryName}))
    const priorities: IShortenedPriority[] = todoPriorities.map(c => ({id: c.id, priorityName: c.priorityName}))
    const [updatableTask, setUpdatableTask] = useState<ITodoTask>({
        id: '',
        taskName: '',
        taskSort: 1,
        createdDt: '',
        dueDt: '',
        isArchived: false,
        isCompleted: false,
        todoCategoryId: '',
        todoPriorityId: '',
    })

    const openUpdateDialog = (task: ITodoTask) => {
        setUpdatableTask(task)
        setUpdateDialogIsOpened(true)
        open()
    }

    const closeHandler = () => {
        setUpdateDialogIsOpened(false)
        close()
    }

    const createHandler = async (task: ITodoTask) => {
        await addTask(task)
    }

    const updateHandler = async (task: ITodoTask) => {
        await updateTask(task)
        setUpdateDialogIsOpened(false)
    }

    return (
        <div className='h-full'>
            <TodoTasksTable categories={categories} priorities={priorities} todoTasks={todoTasks} deleteTask={deleteTask} openUpdateDialog={openUpdateDialog}/>
            {modal && <Modal title={updateDialogIsOpened ? 'Update Todo Task' : 'Add Todo Task'} onClose={closeHandler}>
                {!updateDialogIsOpened && <AddTodoTask onCreated={createHandler} categories={categories} priorities={priorities}/>}
                {updateDialogIsOpened && <UpdateTodoTask categories={categories} priorities={priorities}
                                                         onUpdated={updateHandler} task={updatableTask}/>}
            </Modal>}
            <div className='w-full mx-auto flex justify-center mt-12'>
                <GreenButton type='button' text='Create new Task' onClick={open}/>
            </div>
        </div>
    )
}