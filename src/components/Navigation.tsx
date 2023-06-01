import {Link, useNavigate} from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import {ModalContext} from "../context/ModalContext"
import {AuthContext} from "../context/AuthContext"
import LoginImage from "../assets/images/login_image.svg"
import LogoutImage from "../assets/images/logout_image.svg"

export function Navigation() {
    const {modal, open, close} = useContext(ModalContext)
    const [loggedIn, setLoggedIn] = useState(false)
    const {authorized, user, logout} = useContext(AuthContext)
    const navigate = useNavigate()

    const loginHandler = () => {
        open()
    }

    const logoutHandler = () => {
        setLoggedIn(false)
        logout()
        navigate('/')
    }

    return (
        <nav className='h-[50px] bg-gray-300 flex justify-between items-center px-10 w-full'>
            <span className='flex gap-7'>
                <Link to='/'>Home</Link>
                {authorized && <div>
                    <Link to='/todoCategories'>Categories</Link>
                </div>}
            </span>

            <span className='flex flex-row gap-7 mr-10'>
                {authorized && <p>Welcome {user.credentials.firstName} {user.credentials.lastName}!</p>}
                {!authorized && <button onClick={loginHandler}>
                    <div className='flex flex-row gap-2'>
                        <img src={LoginImage} alt="log in image"/>
                        <p>Log in</p>
                    </div>
                </button>}
                {authorized && <button onClick={logoutHandler}>
                    <div className='flex flex-row gap-2'>
                        <img src={LogoutImage} alt="log out image"/>
                        <p>Log out</p>
                    </div>
                </button>}
            </span>
        </nav>
    )
}