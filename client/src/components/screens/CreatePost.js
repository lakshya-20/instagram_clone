import React,{useState, useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const CreatePost =()=>{
    const history=useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")
    
    useEffect(()=>{
        if(url){
         fetch("/createpost",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 title,
                 body,
                 pic:url
             })
         }).then(res=>res.json())
         .then(data=>{
     
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                history.push('/')
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])
   



    const postDetails=()=>{
        const formData = new FormData();

        formData.append('file',image);
        formData.append('upload_preset',"insta_clone");
        formData.append("cloud_name","dstmsi8qv")
        fetch('	https://api.cloudinary.com/v1_1/dstmsi8qv/image/upload', {
        method: 'post',
        body: formData
        })
        .then(res=>res.json())
        .then(formData=>{
            setUrl(formData.url)
            console.log(url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    

    return(
        <div className="card input-filed" style={{margin:"30px auto",maxWidth:"800px",padding:"20px",textAlign:"center"}}>
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn blue darken-1" >
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-eddect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            >
                    Submit Post
                </button>
        </div>
    )
}



export default CreatePost