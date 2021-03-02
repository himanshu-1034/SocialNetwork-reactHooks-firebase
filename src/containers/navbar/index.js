import React , {useContext} from 'react'
import {SignInButton} from '../../components';
import { UserContext } from '../../contexts/user';
import './style.css';
export default function Navbar() {

    const [user, setUser] = useContext(UserContext).user;




    return (
        <div className="navbar">
            <p>Our Social Network</p>
            {user ? <><img className="navbarPhoto" src={user.photoURL}/></> : <><SignInButton/></>}
        </div>
    )
}
