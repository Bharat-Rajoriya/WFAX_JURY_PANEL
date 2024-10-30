import React from 'react'
import '../assets/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie , faThumbsUp} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <>
    <div className="main_container">
      <div className="marquee_background">
            <div className="marquee" onMouseOver={(e) => e.currentTarget.classList.add("paused")} onMouseOut={(e) => e.currentTarget.classList.remove("paused")}>
              <b> Last date of submission the score is 31st Nov</b>
            </div>
          </div>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Images/logo.webp" alt="logo" height="80px" />
            <div className="login_box">
            <FontAwesomeIcon icon={faUserTie} style={{color: "#ffffff",}} />
            <FontAwesomeIcon icon={faThumbsUp} style={{color:'white'}}/>
              
            </div>
          </a>
        </div>
    </div>
   
    </>
  )
}

export default Navbar