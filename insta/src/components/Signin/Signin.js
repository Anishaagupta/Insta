import React,{useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
import {userContext} from '../../App';

const SignIn =() => {
    // const {state,dispatch} = useContext(userContext);
    const {dispatch} = useContext(userContext);
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // server request
    const PostData = () => {
        if(!email || !password){
            M.toast({html: "Please fill all the details", classes:"#f44336 red"})   
        }else{
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html: "Please Provide Valid Email Id", classes:"#f44336 red"})
                return 
            }
            fetch("/signin",{
                method:"post", 
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            }).then(res=>res.json())
            .then(data=>{
                // console.log(data)
                if(data.error){
                    M.toast({html: data.error, classes:"#f44336 red"})
                }else{
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER", payload:data.user})
                    M.toast({html:"Successfully Signed In.", classes:"#004d40 teal darken-4"})
                    history.push('/')
                }
            })
        }
        
    }

    return (
        <div className="my-card">
            <div className="card auth-card" >
              <h2>Sign In</h2>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Your Email" className="input-field"/>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Your Password" className="input-field"/>
              <button onClick={()=>PostData()} className="btn waves-effect waves-light #1565c0 blue darken-3">Sign in</button>
              <Link to="/signup"> &nbsp; &nbsp; &nbsp; Are you a new user ?</Link>
            </div>
        </div>
    )
}

export default SignIn;
