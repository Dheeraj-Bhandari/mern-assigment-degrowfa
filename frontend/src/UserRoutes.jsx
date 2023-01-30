import React from 'react'
import { Route, Routes } from 'react-router'
import Form from './pages/Form'
import UploadCSV from './pages/UploadCSV'
import UserTabel from './pages/UserTabel'

const UserRoutes = () => {
  return (
    <>
    <Routes>
        
        <Route path="/" element={<Form/>} />
        <Route path="/data" element={<UserTabel/>} />
        <Route path="/uploadcsv" element={<UploadCSV/>} />
    </Routes>
    </>
  )
}

export default UserRoutes;