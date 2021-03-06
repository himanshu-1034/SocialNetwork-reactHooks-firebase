import { auth, provider } from '../firebase';

export const signInWithGoogle = async () => {
    let user;
    await auth.signInWithPopup(provider).then((res) => {
        console.log(res);
        user = res.user;
    }).catch((err) => {
        console.log(err);
    });
    return user;
}

export const logOut = async()=>{
    let logout_success;
    await auth.signOut().then(()=>{
        logout_success=true;
    }).catch((err)=>{
        console.log(err);
        logout_success=false;
    });
    return logout_success;
}