import './style.css';

import React , {useState,useContext,useEffect} from 'react'
import {UserContext} from '../../contexts/user';
import { Post } from '..';
import { database } from '../../firebase';


export default function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        database.collection("posts").onSnapshot((snapshot)=>{
            setPosts(snapshot.docs.map((doc)=>({
                id:doc.id,
                post:doc.data(),
            })
                )
            );
        });    
    },[]);
/*if this array is empty then useeffect will run once on page load but when we give some variable to array then it will run on every time the value of array is modified*/
    
    return (
        <div className="feed">
            {posts.map(({id,post})=>{
                return <Post key={id} photoUrl={post.photoUrl} caption={post.caption} userphotoUrl={post.userphotoUrl} username={post.username} id={id} comments={post.comments}/>
            })}      
        </div>
    )
}
