import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

function CreatePost() {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(()=>{
        if(url){
            fetch("/createPost",{
                method:"post", 
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                   title:title,
                   body:body,
                   pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                // console.log(data)
                if(data.error){
                    M.toast({html: data.error, classes:"#f44336 red"})
                }else{
                    M.toast({html:"Successfully Created Post.", classes:"#004d40 teal darken-4"})
                    history.push('/')
                }
            })
        }
    },[url,body,history,title]); 
    const postDetails = () => {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name","insta-ce-pt")

        fetch("https://api.cloudinary.com/v1_1/insta-ce-pt/image/upload", {
            method: "post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })   
    }
    return (
        <div className="card input-field" style={{margin:"30px auto", maxWidth:"500px", paddingBottom:"50px",paddingTop:"20px",paddingLeft:"20px",paddingRight:"20px", textAlign:"center"}}>
          <input className="input-field" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" />
          <input className="input-field" value={body} onChange={(e)=>setBody(e.target.value)} type="text" placeholder="Write something..." />
            <div className="file-field input-field">
                <div className="btn #1565c0 blue darken-3">
                   <span>Upload Photo</span>
                   <input onChange={(e)=>setImage(e.target.files[0])} type="file" className="input-field"/>
                </div>
               <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                <button onClick={()=>postDetails()} className="btn waves-effect waves-light #1565c0 blue darken-3">Save Post</button>
            </div>
            
        </div>
    )
}

export default CreatePost;
