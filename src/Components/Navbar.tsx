import React, { useEffect, useState } from 'react'
import '../assets/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [juryName, setJuryName] = useState(''); 
  useEffect(()=>{
    var juryDataString = localStorage.getItem('jury_data');
    if (juryDataString) {
      var jury_data = JSON.parse(juryDataString);
      setJuryName(jury_data[0].full_name);
      
    }else{
      console.log("No jury data found");
    }
    
  },[])
  return (
    <>
    <div className="main_container_navbar">
      <div className="marquee_background">
            <div className="marquee" onMouseOver={(e) => e.currentTarget.classList.add("paused")} onMouseOut={(e) => e.currentTarget.classList.remove("paused")}>
              <b> Last date of submission the score is 31st Nov</b>
            </div>
          </div>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Images/logo.webp" alt="logo" height="60px" />            
         
            <div className="login_box">
            </div>
          </a>
          <div className="login_box">
            <FontAwesomeIcon icon={faUserTie} style={{color: "#ffffff",fontSize:'30px'}} />
             <h4 style={{color:"#ffffff"}}>{juryName}</h4>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Navbar