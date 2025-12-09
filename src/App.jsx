import React from 'react'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/*user Routes */}
      <Route path='/*' element={<UserRoutes/>}/>


      {/*admin Routes */}
      <Route path='/admin/*' element={<AdminRoutes/>}/>

      </Routes></BrowserRouter>
      
    </>
  )
}

export default App
