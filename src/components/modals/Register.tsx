import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {IUser} from "../../model/user";
import {ErrorComponent} from "../ErrorComponent";
import {AuthContext} from "../../context/AuthContext";
import {LoadingComponent} from "../LoadingComponent";

interface IRegisterProps{
    onClose: () => void,
}

export function Register({onClose}: IRegisterProps) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {authError, register} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const changeFirstName = (event: ChangeEvent<any>) => {
        setFirstName(event.target.value)
    }

    const changeLastName = (event: ChangeEvent<any>) => {
        setLastName(event.target.value)
    }

    const changePassword = (event: ChangeEvent<any>) => {
        setPassword(event.target.value)
    }

    const changeEmail = (event: ChangeEvent<any>) => {
        setEmail(event.target.value)
    }

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()

        setError('')

        if (!isValidData(firstName, 'Enter first name') ||
            !isValidData(lastName, 'Enter last name') ||
            !isValidData(email, 'Enter email') ||
            !isValidData(password, 'Enter password')){
            return
        }

        setLoading(true)

        await register({
            email: email,
            password: password,
            credentials: {
                firstName: firstName,
                lastName: lastName,
            }
        })

        setLoading(false)
        onClose()
    }

    const isValidData = (data: string, errorMessage: string) => {
        if (!data.trim()){
            setError(errorMessage)
            return false
        }

        return true
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <p className='font-semibold text-xl mb-1'>First Name:</p>
                <input type="text"
                    className='border py-2 px-4 mb-1 w-full outline-0 rounded-md'
                    value={firstName}
                    onChange={changeFirstName}
                />
                <p className='font-semibold text-xl mb-1'>Last Name:</p>
                <input type="text"
                       className='border py-2 px-4 mb-1 w-full outline-0 rounded-md'
                       value={lastName}
                       onChange={changeLastName}
                />
                <p className='font-semibold text-xl mb-1'>Email:</p>
                <input type="email"
                       className='border py-2 px-4 mb-1 w-full outline-0 rounded-md'
                       value={email}
                       onChange={changeEmail}
                />
                <p className='font-semibold text-xl mb-1'>Password:</p>
                <input type="password"
                       className='border py-2 px-4 mb-1 w-full outline-0 rounded-md'
                       value={password}
                       onChange={changePassword}
                />
                {(error || authError) && <ErrorComponent message={error === '' ? authError : error} />}
                <div className='flex justify-center mt-7 mb-6'>
                    <button
                        type='submit'
                        className='rounded-xl py-3 px-14 w-[50%] font-bold bg-pastel-green-100 hover:bg-pastel-green-200
                        text-white'
                    >Register</button>
                </div>
            </form>
            {loading && <LoadingComponent />}
        </div>
    )
}