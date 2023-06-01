import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {ErrorComponent} from "../ErrorComponent";
import {LoadingComponent} from "../LoadingComponent";
import {AuthContext} from "../../context/AuthContext";
import {LoginDialogContext} from "../../context/LoginDialogContext";
import {Register} from "./Register";

export function Login() {
    const {registering, closeRegistration, openRegistration} = useContext(LoginDialogContext)
    const {authError, login, clearError} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const changeUserEmail = (event: ChangeEvent<any>) => {
        setEmail(event.target.value)
    }

    const changeUserPassword = (event: ChangeEvent<any>) => {
        setPassword(event.target.value)
    }

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        setError('')

        if (!email.trim()){
            setError('Enter email')
            return
        }

        if (!password.trim()) {
            setError('Enter password')
            return
        }

        setLoading(true)
        await login({
            email: email,
            password: password,
            credentials: {},
        })

        setLoading(false)
    }

    const registerHandler = () => {
        openRegistration()
    }

    const closeHandler = () => {
        closeRegistration()
        setError('')
        clearError()
    }

    return (
        <div>
            {!registering && <div>
                <form onSubmit={submitHandler}>
                    <p className='font-semibold text-xl mb-1'>Email:</p>
                    <input
                        type='email'
                        className='border py-2 px-4 mb-6 w-full outline-0 rounded-md'
                        value={email}
                        onChange={changeUserEmail}
                    />
                    <p className='font-semibold text-xl mb-1'>Password:</p>
                    <input
                        type='password'
                        className='border py-2 px-4 mb-1 w-full outline-0 rounded-md'
                        value={password}
                        onChange={changeUserPassword}
                    />

                    {(error || authError) && <ErrorComponent message={error === '' ? authError : error} />}

                    <div className='flex justify-center mt-7 mb-6'>
                        <button
                            type='submit'
                            className='rounded-xl py-6 w-[50%] px-14 font-bold text-button-blue-300 border-2
                            border-button-blue-300 hover:border-button-blue-400 hover:text-white hover:bg-button-blue-400'
                        >LOG IN</button>
                    </div>
                </form>
                <div className='flex justify-center mt-7 mb-6'>
                    <button
                        type='button'
                        className='rounded-xl py-3 px-14 w-[50%] font-bold bg-pastel-green-100 hover:bg-pastel-green-200
                            text-white'
                        onClick={registerHandler}
                    >Registration</button>
                </div>
                {loading && <LoadingComponent />}
            </div>}
            {registering && <Register onClose={closeHandler}/>}
        </div>
    )
}