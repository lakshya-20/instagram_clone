import React,{useEffect,createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'

export const usercontext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(usercontext)
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }
    else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  );
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <usercontext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
    </usercontext.Provider>
    
  );
}

export default App;
