import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {userContext} from '../../App';

function Navbar() {
    const {state, dispatch} = useContext(userContext);
    const history = useHistory()
    const renderList = () => {
      if(state){
        return[ 
        <li><Link to="/createPost">Create Post</Link></li>,
        <li><Link to="/myFollowingPost">Following Post</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li>
          <button className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push("/signin");
          }}
          >Logout
          </button>
        </li>]
      }else{
        
        return[
        <li><Link to="/signin">SignIn</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>]
      }
    }
    return (        
    <nav>
    <div className="nav-wrapper white">
      <Link to={state ? "/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
       {renderList()}
      </ul>
    </div>
    </nav>
  )
}

export default Navbar;
