import {Modal} from "../components/Modal";
import {useTodoPriorities} from "../hooks/todoPriority";
import {useContext, useState} from "react";
import {ModalContext} from "../context/ModalContext";
import { ITodoPriority } from "../model/todoPriority";
import {TodoPrioritiesTable} from "../components/todoPriorities/TodoPrioritiesTable";
import {AddTodoPriority} from "../components/todoPriorities/modals/AddTodoPriority";
import {UpdateTodoPriority} from "../components/todoPriorities/modals/UpdateTodoPriority";
import {GreenButton} from "../components/common/Button";

export function TodoPriorityPage() {
    const {modal, open, close} = useContext(ModalContext)
    const {todoPriorities, addPriority, deletePriority, updatePriority} = useTodoPriorities()
    const [updateDialogIsOpened, setUpdateDialogIsOpened] = useState(false)
    const [updatablePriority, setUpdatablePriority] = useState<ITodoPriority>({
        priorityName: '',
        prioritySort: 1,
    })

    const openUpdateDialog = (priority: ITodoPriority) => {
        setUpdatablePriority(priority)
        setUpdateDialogIsOpened(true)
        open()
    }

    const closeHandler = () => {
        setUpdateDialogIsOpened(false)
        close()
    }

    const createHandler = async (priority: ITodoPriority) => {
        await addPriority(priority)
    }

    const updateHandler = async (priority: ITodoPriority) => {
        await updatePriority(priority)
        setUpdateDialogIsOpened(false)
    }

    return (
        <div className='h-full'>

            <TodoPrioritiesTable todoPriorities={todoPriorities} deletePriority={deletePriority} openUpdatePriorityDialog={openUpdateDialog}/>
            {modal && <Modal title={updateDialogIsOpened ? 'Update Todo Priority' : 'Add Todo Priority'} onClose={closeHandler}>
                {!updateDialogIsOpened && <AddTodoPriority onCreated={createHandler}/>}
                {updateDialogIsOpened && <UpdateTodoPriority onUpdated={updateHandler} todoPriority={updatablePriority}/>}
            </Modal>}

            <div className='w-full mx-auto flex justify-center mt-12'>
                <GreenButton type='button' text='Create new Priority' onClick={open}/>
            </div>
        </div>
    )
}