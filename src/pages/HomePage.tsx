import {Modal} from "../components/Modal";
import {Login} from "../components/modals/Login";
import {useContext, useState} from "react";
import {ModalContext} from "../context/ModalContext";
import {LoginDialogContext} from "../context/LoginDialogContext";
import {AuthContext} from "../context/AuthContext";
import {TodoTasksList} from "../components/todoTasks/TodoTasksList";
import {useTodoTask} from "../hooks/todoTask";
import { ITodoTask } from "../model/todoTask";
import {writeSync} from "fs";

export function HomePage() {
    const {modal, close} = useContext(ModalContext)
    const {registering, closeRegistration} = useContext(LoginDialogContext)
    const {authorized} = useContext(AuthContext)
    const {todoTasks, updateTask} = useTodoTask()

    const closeHandler = () => {
        close()
        closeRegistration()
        console.log(registering)
    }

    const updateTaskStatus = async (todoTask: ITodoTask) => {
        todoTask.isCompleted = true
        await updateTask(todoTask)
    }

    return (
        <div className='h-screen flex items-center justify-center flex-col'>
            <p className='text-2xl font-bold'>
                Welcome to my 3-th homework!
            </p>

            {authorized && <TodoTasksList todoTasks={todoTasks.filter(t => !t.isCompleted)} onUpdated={updateTaskStatus}/>}

            {modal && <Modal title={registering ? 'Registration' : 'Login'} onClose={closeHandler}>
                <Login />
            </Modal>}
        </div>
    )
}