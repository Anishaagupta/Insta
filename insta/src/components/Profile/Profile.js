import React,{useEffect,useState, useContext} from 'react';
import {userContext} from '../../App';

function Profile() {
    const [myPics, setPics] = useState([]);
    const {state, dispatch} = useContext(userContext);
    const [image,setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
             setPics(result.mypost)
        })
    }, [url])

    useEffect(()=>{
        if(image){
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

            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                setUrl(data.url)
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic: data.url}))
                dispatch({type:"UPDATEPIC",payload: data.url})
                window.location.reload()
            })
        
         })
         .catch(err=>{
             console.log(err)
         })
        }
     },[image,dispatch,state])

    const updatePhoto = (file) =>{
        setImage(file)
    }
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{display:"flex",borderBottom:"1px solid grey", justifyContent:"space-around",margin:"18px 0px"}}>
                <div>
                    <img style={{width:"180px",height:"180px",borderRadius:"100px"}}
                        src={state?state.pic:"upload an image"} alt=""
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading..."}</h4>
                    <div style={{display:"flex", justifyContent:"space-between",width:"108%"}}>
                       <h6>{myPics.length} Posts</h6>
                       <h6>{state?state.following.length:"0"} Following</h6>
                       <h6>{state?state.followers.length:"0"} Followers</h6>
                    </div>
                </div>
                
            </div>
            <div className="file-field input-field">
            <div className="btn #1565c0 blue darken-3">
                <span>Change Photo</span>
                <input className="input-field" type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate input-field" type="text" />
            </div>
            </div>
            
            
            <div className="gallery">
                   {
                       myPics.map((item)=>{
                           return( <img key={item._id} className="item" src={item.photo} alt="Post_pics"
                    />)
                       })
                   }
            </div>        
        </div>
    )
}

export default Profile
