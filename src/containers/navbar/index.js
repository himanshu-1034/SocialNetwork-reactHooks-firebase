import React , {useContext} from 'react'
import {SignInButton} from '../../components';
import { UserContext } from '../../contexts/user';
import { logOut } from '../../services/auth';
import './style.css';
export default function Navbar() {

    const [user, setUser] = useContext(UserContext).user;

    const signOut = () =>{
        logOut();
        setUser(null);
    }


    return (
        <div className="navbar">
            <p>Our Social Network</p>
            {user ? <div className="signoutDiv"><img className="navbarPhoto" src={user.photoURL}/><button className="signoutbtn" onClick={signOut}>Sign Out</button></div> : <><SignInButton/></>}
        </div>
    )
}
