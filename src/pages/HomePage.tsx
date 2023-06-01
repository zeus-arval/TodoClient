import {Modal} from "../components/Modal";
import {Login} from "../components/modals/Login";
import {useContext} from "react";
import {ModalContext} from "../context/ModalContext";
import {LoginDialogContext} from "../context/LoginDialogContext";

export function HomePage() {
    const {modal, close} = useContext(ModalContext)
    const {registering, closeRegistration} = useContext(LoginDialogContext)

    const closeHandler = () => {
        close()
        closeRegistration()
    }

    return (
        <div className='h-screen flex items-center justify-center'>
            <p className='text-2xl font-bold'>
                Welcome to my 3-th homework!
            </p>

            {modal && <Modal title={registering ? 'Registration' : 'Login'} onClose={closeHandler}>
                <Login />
            </Modal>}
        </div>
    )
}