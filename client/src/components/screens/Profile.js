import React,{useEffect,useState,useContext} from 'react'
import {usercontext} from '../../App'

const Profile =()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(usercontext)
    const [image,setImage] = useState("")
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

    useEffect(()=>{
        if(image){
         const data = new FormData()
         data.append("file",image)
        data.append('upload_preset',"insta_clone");
        data.append("cloud_name","dstmsi8qv")
        fetch('	https://api.cloudinary.com/v1_1/dstmsi8qv/image/upload',{
             method:"post",
             body:data
         })
         .then(res=>res.json())
         .then(data=>{
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                localStorage.setItem("user",JSON.stringify({...state,photo:result.photo}))
                dispatch({type:"UPDATEPIC",payload:result.photo})
                window.location.reload()
            })
        
         })
         .catch(err=>{
             console.log(err)
         })
        }
     },[image]) 
     const updatePhoto = (file)=>{
         setImage(file)
     }


    return(
        <div style={{maxWidth:"1000px",margin:"0px auto  "}}>
            <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.photo:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
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