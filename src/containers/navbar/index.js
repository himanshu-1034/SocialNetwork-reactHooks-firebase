import React from 'react'
import {SignInButton} from '../../components';
import './style.css';
export default function Navbar() {
    return (
        <div className="navbar">
            <p>Our Social Network</p>
            <SignInButton/>
        </div>
    )
}
