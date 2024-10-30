import { useState } from 'react'
import './App.css'
import Jury_panel from './Components/Jury_panel'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Jury_panel />
      <Footer />
    </>
  )
}

export default App
