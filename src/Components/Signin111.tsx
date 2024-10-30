import React, { useEffect, useState } from 'react'
import "../assets/Signin.css"
import axios from 'axios'

const Signin = () => {
  const [formdata, setFormdata] = useState({
    email:''
  })

  const handleSubmit = (e:any) => {
    e.preventDefault()
    axios.post('http://localhost:5001/jurycheck', formdata)
    .then(res => {
        console.log(res.data);
       if(res.data){
        
       }
    })
    .catch(err => {
        console.log(err)
    });

  }
  useEffect(()=>{

  },[])
  return (
   <>
   <div className="singin_container">
        <div className="singin_form_block">
        <div className="card_title">
          <h1 className='text-black' style={{color:'white'}}>Please login to continue</h1>
          
        </div>
        <div className="form">
        <form action="/register" method="post">
          <input type="email" name="email" placeholder="Email" id="email" onChange={e => setFormdata({...formdata, email:e.target.value})} />
          <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        </div>
   </div>
   </>
  )
}

export default Signin