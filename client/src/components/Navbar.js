import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link, useHistory } from 'react-router-dom'
import {usercontext} from'../App'
import M from 'materialize-css'

const NavBar = ()=>{
    const searchModal=useRef(null)
    const {search,setSearch}=useState('')
    const {state,dispatch}=useContext(usercontext)
    const history=useHistory()

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])

    const renderList =()=>{
        console.log("navbar",state)
        if(state){
            return[
                <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
                <li key='2'><Link to="/profile">Profile</Link></li>,
                <li key='3'><Link to="/create">Create Post</Link></li>,
                <li key='4'><Link to="/myfollowersposts">Subscribed Posts</Link></li>,
                <li key='5'>
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
                <li key='6'><Link to="/login">Login</Link></li>,
                <li key='7'><Link to="/signup">Signup</Link></li>
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
            <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
                <div className="modal-content">
                <input
                    type="text"
                    placeholder="search users"
                    value={search}
                    
                />
                <ul class="collection">
                    <li class="collection-item">Alvin</li>
                    <li class="collection-item">Alvin</li>
                    <li class="collection-item">Alvin</li>
                    <li class="collection-item">Alvin</li>
                </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
                </div>
            </div>
        </nav>
    )
}


export default NavBar