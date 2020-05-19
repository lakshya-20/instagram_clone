import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Login  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [repassword,setRepassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [gender,setGender] = useState("")
    const [url,setUrl] = useState(null)
    const [toggleShow1,setToggleShow1]=useState(false)
    const [toggleShow2,setToggleShow2]=useState(false)
    const [username,setUsername] = useState("")
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
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
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const checkUsername = (event)=>{
        var un=event.target.value
        fetch('/username',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:un
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                setUsername(un)
                M.toast({html:data.message,classes:"#43a047 green darken-1"})
                
            }
         }).catch(err=>{
             console.log(err)
         })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        if(password!==repassword){
            M.toast({html:"password does match",classes:"#c62828 red darken-3",displayLength:1500})
            return
        }
        if(username==""){
            M.toast({html: "chhose a different username",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url,
                gender,
                username
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }
    
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="username"
            onBlur={(event)=>checkUsername(event)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <ul style={{listStyle:"none"}}>
                <li>
                    <input
                    type={toggleShow1?"text":"password"}
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    style={{float:"left",width:"80%"}}
                    />
                </li>
                <li>
                    <i class="material-icons" style={{marginTop:"2px"}} onClick={(e)=>setToggleShow1(!toggleShow1)}>remove_red_eye</i>
                </li>
            </ul>
            <ul style={{listStyle:"none"}}>
                <li>
                    <input
                    type={toggleShow1?"text":"password"}
                    placeholder="repassword"
                    value={repassword}
                    onChange={(e)=>setRepassword(e.target.value)}
                    style={{float:"left",width:"80%"}}
                    />
                </li>
                <li>
                    <i class="material-icons" style={{marginTop:"20px"}} onClick={(e)=>setToggleShow2(!toggleShow2)}>remove_red_eye</i>
                </li>
            </ul>
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <p>
            <label>Gender  </label>
            <label>
                <input class="with-gap" name="gender" placeholder="gender" value="male" type="radio" onChange={(e)=>setGender(e.target.value)} />
                <span>Male</span>
            </label>
            <label>
                <input class="with-gap" name="gender" placeholder="gender" value="female" type="radio" onChange={(e)=>setGender(e.target.value)} />
                <span>Female</span>
            </label>
            <label>
                <input class="with-gap" name="gender" placeholder="gender" value="other" type="radio" onChange={(e)=>setGender(e.target.value)} />
                <span>Other</span>
            </label>
            </p>


            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/login">Already have an account ?</Link>
            </h5>
             
               
         
            
    
        </div>
      </div>
   )
}


export default Login