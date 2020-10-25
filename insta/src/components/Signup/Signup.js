import React,{useState,useEffect, useCallback} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignUp  = ()=>{

    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
     
    const uploadFields = useCallback( ()=> {

        if(!name || !email || !password){
            M.toast({html: "Please fill all the details", classes:"#f44336 red"})   
        }else{
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
                return
            }
            fetch("/signup",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    password,
                    email,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
               if(data.error){
                  M.toast({html: data.error,classes:"#c62828 red darken-3"})
               }
               else{
                   M.toast({html:data.message,classes:"#43a047 green darken-1"})
                   history.push('/signin')
               }
            }).catch(err=>{
                console.log(err)
            })

        }
        
    },[url,email,history,name,password])

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url,uploadFields])

    const uploadPic = ()=>{
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
    
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            className="input-field"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            className="input-field"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            className="input-field"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn #1565c0 blue darken-3">
                <span>Upload Profile Photo</span>
                <input className="input-field" type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate input-field" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #1565c0 blue darken-3"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/signin"> Already have an account ?</Link>
            </h5>
         
        </div>
      </div>
   )
}


export default SignUp