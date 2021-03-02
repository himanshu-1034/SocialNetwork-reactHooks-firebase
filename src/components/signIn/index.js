import React from 'react';
import { signInWithGoogle } from '../../services/auth';
import './style.css';
import {useContext} from 'react';
import { UserContext } from '../../contexts/user';

export default function SignInButton() {

  const [user, setUser] = useContext(UserContext).user;

  const signInClick = async () =>{
    let userBySignIn = await signInWithGoogle();
    if(userBySignIn){
      setUser(userBySignIn);
      console.log(userBySignIn);
    }
  }

  return (
    <>
    <div className="signInBtn">
        <p onClick={signInClick}>Sign In With Google</p>
    </div>
    </>
  );
}
