import { useState } from 'react'
import './App.css'
import Jury_panel from './Components/-----Jury_panel'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './Components/Signin'
import Admin_panel from './Components/Admin_panel'
import Candidate_Submission from './Components/Candidate_Submission'
import Grand_jury from './Components/Grand_jury'
import Candidate_auth from './Components/Candidate_auth'
import Grand_jury_auth from './Components/Grand_jury_auth'

function App() {

  return (
    <>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true }}
      >
        <Navbar />
        <Routes>
          <Route path="/jury" element={<Jury_panel />} />
          <Route path='/jury_auth' element={<Signin />} />
          <Route path='/admin_dashboard' element={<Admin_panel />} />
          <Route path='/candidate_submission' element={<Candidate_Submission/>}/>
          <Route path='/grand_jury' element={<Grand_jury />} />
          <Route path='/candidate_auth' element={<Candidate_auth/>}/>
          <Route path='/grand_jury_auth' element={<Grand_jury_auth/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
