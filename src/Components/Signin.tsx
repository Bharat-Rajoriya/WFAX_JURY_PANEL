import React, { useEffect, useState } from 'react'
import "../assets/Signin.css"
import axios from 'axios'
import { useNavigate,  } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email:''
  })

  const handleSubmit = (e:any) => {
    e.preventDefault()
    axios.post('http://localhost:5001/jurycheck', formdata)
    .then(res => {
        console.log(res.data,"data is here");
        var jury_data = res.data;
        console.log(jury_data.data,"data is here");
        localStorage.setItem('jury_data', JSON.stringify(jury_data.data));
       if(res.data.message === 'success'){
         navigate('/jury');
       }
    })
    .catch(err => {
      if (err.response && err.response.status === 404 && err.response.data.message === 'Email does not exist') {
        alert("Email does not exist Please contact admin");
        
    } else {
        console.error("Error:", err);
    }
    });

  }
  useEffect(()=>{

  },[])
  return (
   <>
   <div className="singin_container">
        <div className="singin_form_block">
        <div className="card_title">
          <h1 style={{color:'black'}}>Please login to continue</h1>
         
        </div>
        <div className="form">
        <form  onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" id="email" onChange={e => setFormdata({...formdata, email:e.target.value})} />
          <button className="btn_submit" type='submit'>Submit</button>
          </form>
        </div>
        </div>
   </div>
   </>
  )
}

export default Signin