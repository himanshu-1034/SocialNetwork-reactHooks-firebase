import React from 'react';
import './style.css';
import {SignInButton} from '../../components';

export default function CreatePost() {
    return (
        <div className="createPost">
            <SignInButton/>
            <p style={{marginLeft:"12px"}}>to Post & Comment.</p>
        </div>
    )
}
