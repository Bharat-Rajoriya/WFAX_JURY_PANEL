import React from 'react'
import "../assets/Signin.css"

const Signin = () => {
  return (
   <>
   <div className="singin_container">
        <div className="singin_form_block">
        <div className="card_title">
          <h1>Please login to continue</h1>
         
        </div>
        <div className="form">
        <form action="/register" method="post">
          <input type="email" name="email" placeholder="Email" id="email" />
          <button className="btn_submit">Submit</button>
          </form>
        </div>
        </div>
   </div>
   </>
  )
}

export default Signin