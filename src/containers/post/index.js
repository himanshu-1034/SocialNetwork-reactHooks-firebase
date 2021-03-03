import './style.css';

import React , {useState,useContext} from 'react'
import {UserContext} from '../../contexts/user';
import {Comment, CommentInput} from '../../components';
import { database, storage } from '../../firebase';

export default function Post({userphotoUrl,username,id,photoUrl,caption,comments}) {

    const [user, setUser] = useContext(UserContext).user;
    const deletePost = ()=>{
        var imageRef = storage.refFromURL(photoUrl);

        imageRef.delete().then(()=>{
            console.log("successful Delete");
        }).catch((err)=>{
            console.log("Photo storage delete error : "+err);
        });

        database.collection("posts").doc(id).delete().then(()=>{
            console.log("record also deleted");
        }).catch((err)=>{
            console.log("record delete error: "+err);
        });

    }

    return (
        <div className="post">
        <div className="postUserphoto-delete">
            <div className="postUserphoto">
            <img src={userphotoUrl} className="postProfileimg"/>
            <p style={{marginLeft:"8px"}}>{username}</p>
            </div>
            {user? user.email.replace("@gmail.com","")===username ? <button className="postDeletebtn" onClick={deletePost}>Delete</button> : <></>  : <></>}
        </div>
        <div className="postImagePart">
            <img src={photoUrl} className="postImagePart_Photo"/>
        </div>
        <div className="PostCaption">
            <p><span style={{fontWeight:"600",marginRight:"6px"}}>{username}</span>{caption}</p>
        </div>
        {user ? <CommentInput id={id} comments={comments}/> : <></>}

        {comments ? comments.map((comment)=>{
            return <Comment comment={comment.comment} username={comment.username}/>
        }) : <></>}
    </div> 
    );
}
