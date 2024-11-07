import React from 'react'
import '../assets/Admin_panel.css'

const Admin_panel = () => {
  return (
    <>
    <div id="left-menu">
        <ul>
            <li><a href="#">
                <i className="ion-ios-chatboxes-outline"></i>
                <span>All ZONE</span>
            </a></li>
            <li><a href="#">
                <i className="ion-ios-chatboxes-outline"></i>
                <span>EAST</span>
            </a></li>
            <li><a href="#">
                <i className="ion-ios-person-outline"></i>
                <span>West</span>
            </a></li>
            <li><a href="#">
                <i className="ion-ios-person-outline"></i>
                <span>North</span>
            </a></li>
            <li><a href="#">
                <i className="ion-ios-albums-outline"></i>
                <span>South</span>
            </a></li>
        </ul>
    </div>
    <div id="main-content">     
        <div id="page-container">
            <div className="card">
                <div className="title">Users</div>
            </div>
            <div className="card">
                <div className="title">Users</div>

            </div>
        </div>
    </div>
    
    </>
  )
}

export default Admin_panel