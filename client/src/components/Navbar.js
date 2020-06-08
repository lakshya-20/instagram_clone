import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link, useHistory } from 'react-router-dom'
import {usercontext} from'../App'
import M from 'materialize-css'

const NavBar = ()=>{
    const searchModal=useRef(null)
    const [search,setSearch]=useState('')
    const [userDetails,setUserDetails]=useState([])
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

    const fetchUsers=(query)=>{
        setSearch(query)
        fetch('/search-users',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(results=>{
            setUserDetails(results.user)
            console.log(userDetails)
        })
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
                    onChange={(e)=>fetchUsers(e.target.value)}
                />
                <ul class="collection">
                    {userDetails.map(item=>{
                        return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                            M.Modal.getInstance(searchModal.current).close()
                            setSearch('')
                            setUserDetails([])
                        }}><li className="collection-item">{item.username}</li></Link>
                    })}
                </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>{
                        setSearch('')
                        setUserDetails([])
                    }}>Close</button>
                </div>
            </div>
        </nav>
    )
}


export default NavBar