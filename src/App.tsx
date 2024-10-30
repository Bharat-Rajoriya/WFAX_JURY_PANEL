import { useState } from 'react'
import './App.css'
import Jury_panel from './Components/Jury_panel'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/jury" element={<Jury_panel />} />
          <Route path='/jury:id' element={<Jury_panel />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
