
import React, { useEffect, useRef, useState } from 'react'
import "../assets/Signin.css"
import axios from 'axios'
import { useNavigate,  } from 'react-router-dom'
import { Toast } from 'primereact/toast';

const Grand_jury_auth = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [formdata, setFormdata] = useState({
    email:''
  })

  const showError = () => {
    toast.current?.show({severity:'error', summary: 'Error', detail:'Email does not exist in the records.', life: 3000});
}

  const handleSubmit = (e:any) => {
    e.preventDefault()
    axios.post('http://localhost:5001/checkgrandjury', formdata)
    .then(res => {
        console.log(res.data.status);
       if(res.data.message === 'success'){
         navigate('/grand_jury');
       }
    })
    .catch(err => {
        if (err.response && err.response.status === 404 && err.response.data.message === 'Email does not exist') {
            alert("Email does not exist Please contact admin");
            showError();
        } else {
            console.error("Error:", err);
        }
        
    });

  }

  return (
   <>
    <Toast ref={toast}  position="top-left"/>
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

export default Grand_jury_auth

