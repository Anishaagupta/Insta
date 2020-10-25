import React,{useEffect,useContext} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Home from '../components/Home/Home';
import SignIn from '../components/Signin/Signin';
import NotFound from '../components/NotFound/NotFound';
import Profile from '../components/Profile/Profile';
import Signup from '../components/Signup/Signup';
import CreatePost from '../components/CreatePost/CreatePost';
import { userContext } from '../App';
import UserProfile from '../components/UserProfile/UserProfile';
import SubscribedUserPosts  from '../components/Subscribe/SubscribesUserPosts';


const AppRouter = () => {
    const history = useHistory()
    const {dispatch} = useContext(userContext);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user){
            dispatch({type:"USER", payload:user})
        }else{
            history.push("/signin")
        }
    }, [dispatch, history])
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:userid" component={UserProfile} />
            <Route exact path="/createPost" component={CreatePost} />
            <Route exact path="/myFollowingPost" component={SubscribedUserPosts} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default AppRouter ;
