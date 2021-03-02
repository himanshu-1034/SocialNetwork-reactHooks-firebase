import React from 'react';
import './style.css';
import { SignInButton } from '../../components';
import { UserContext } from '../../contexts/user';
import { useContext,useState } from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { database, storage } from '../../firebase';
import makeId from '../../helper/functions';
import firebase from 'firebase';
export default function CreatePost() {

    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [imageUrl, setimageUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const handleChange = (event)=>{
        if(event.target.files[0]){
            setimageUrl(event.target.files[0]);
            var selectedImage = URL.createObjectURL(event.target.files[0]);

            var imagepreview = document.getElementById("image-preview");
            imagepreview.src = selectedImage;
            imagepreview.style.display="block";
        }

    }

    const handleUpload=()=>{
        if(imageUrl){
            let uniqueId = makeId(10);
            const uploadTask = storage.ref(`images/${uniqueId}.jpg`).put(imageUrl);

            uploadTask.on("state_changed",(snapshot)=>{
                // progress function to check the progress of uploading 
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
            },(err)=>{
                console.log(err);
            },()=>{
                // this function will run on 100% upload of image
                storage.ref(`images`).child(`${uniqueId}.jpg`).getDownloadURL().then((url)=>{
                    database.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        photoUrl:url,
                        username: user.email.replace("@gmail.com",""),
                        userphotoUrl:user.photoURL
                    });
                });
            });

        }
    }

    return (
        <div className="createPost">
            {user ? 
            <div className="createpostLogin"><p>Create A Post.</p>
                <div className="createpostArea">
                    <textarea placeholder="Write some caption..." className="createpostTextarea" rows="3" value={caption} onChange={(e)=>{setCaption(e.target.value)}}></textarea>
                    <div className="createpostSelectedimage">
                        <img id="image-preview" alt=""/>
                    </div>
                </div>
                <div className="createpostImageandButton">
                <div className="createpostImageupload">
               <label htmlFor="fileInput"><AddAPhotoIcon style={{cursor:"pointer",fontSize:"20px"}}/></label> 
                    <input id="fileInput" type="file" accept="image/*" onChange={handleChange}/>
                </div>
                <button className="createpostUpload" onClick={handleUpload} style={{color:caption? "black" : "lightgray" }}>{`Upload ${progress!=0 ? progress+ " %" : ""}`}</button>
            
                </div>
                </div> : <><SignInButton />
                <p style={{ marginLeft: "12px" }}>to Post & Comment.</p></>}
        </div>
    )
}
