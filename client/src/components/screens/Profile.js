import React,{useEffect,useState,useContext} from 'react'
import {usercontext} from '../../App'

const Profile =()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(usercontext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
            console.log(result.mypost)
        })
    },[])
    return(
        <div style={{maxWidth:"1000px",margin:"0px auto  "}}>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                    src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between", width:"109%"}}>
                        <h6>{mypics.length} Posts</h6>
                        <h6>{state?state.followers.length:0} Followers</h6>
                        <h6>{state?state.following.length:0} Following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img className="item" src={item.photo} key={item._id}/>
                        )
                    })
                }
            </div>
        
        </div>
    )
}

export default Profile;