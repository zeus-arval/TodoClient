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

    const closeHandler = () => {
        close()
        closeRegistration()
        console.log(registering)
    }

    return (
        <div className='h-screen flex items-center  flex-col'>
            <div className='text-center text-4xl mt-24'>
                Home Page
            </div>
            {authorized && <TodoTasksList />}

            {modal && <Modal title={registering ? 'Registration' : 'Login'} onClose={closeHandler}>
                <Login />
            </Modal>}
        </div>
    )
}