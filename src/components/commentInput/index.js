import './style.css';

import React,{useState,useContext} from 'react';
import { UserContext } from '../../contexts/user';
import { database } from '../../firebase';

export default function CommentInput({id , comments}) {

    const [comment, setComment] = useState("");
    const [user, setUser] = useContext(UserContext).user;
    const [commentArray, setcommentArray] = useState(comments?comments:[]);
    const addComment = () =>{
        if(comment!=""){
            commentArray.push({
                comment:comment,
                username:user.email.toString().replace("@gmail.com","")
            });
            database.collection("posts").doc(id).update({
                comments: commentArray
            }).then(()=>{
                setComment("");
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    return (
        <div className="commentinput">
            <textarea className="commentTextarea" rows="1" placeholder="Leave a comment..." onChange={(e)=>setComment(e.target.value)} value={comment}>
            </textarea>
            <button className="postComment" onClick={addComment}>Post</button>
        </div>
    )
}
