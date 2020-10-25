import React,{createContext, useReducer} from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './routes/index';
import './App.css';
import {reducer, initialState} from './redux/reducers/userReducer/userReducer';

export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
   <userContext.Provider value={{state:state, dispatch:dispatch}}>
   <Navbar/>
    <AppRouter/>
   </userContext.Provider>  
  );
}

export default App;
