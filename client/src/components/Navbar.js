import React,{useContext} from 'react'
import {Link, useHistory } from 'react-router-dom'
import {usercontext} from'../App'


const NavBar = ()=>{
    const {state,dispatch}=useContext(usercontext)
    const history=useHistory()
    const renderList =()=>{
        console.log("navbar",state)
        if(state){
            return[
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li><Link to="/myfollowersposts">Subscribed Posts</Link></li>,
                <li>
                    <button className="btn #c62828 red darken-3" onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/login')
                    }}>
                        Logout
                    </button>
                </li>
            ]
        }
        else{
            return[
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }


    return(
        <nav>
            <div className="nav-wrapper white">
                <Link to={state?"/":"/login"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}


export default NavBar