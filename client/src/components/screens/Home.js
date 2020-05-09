import React, {useState,useEffect} from 'react'


const Home =()=>{
    
    return(
        <div className="home">
            <div className="card home-card">
                <h5>Lakshya</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="add a comment" />
                </div>
            </div>
        </div>
    )
}

export default Home;