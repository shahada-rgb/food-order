import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AddFood from '../pages/admin/AddFood'
import ManageUser from '../pages/admin/ManageUser'
import ManageOrder from '../pages/admin/ManageOrder'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLayout from '../Compponents/Admin/AdminLayout'

function AdminRoutes() {
  return (
    <Routes>
      {/* Default route for /admin */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Admin pages */}
      <Route path="/dashboard" element={
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
        } 
     />
      <Route path="/addfood" element={
        <AdminLayout><AddFood /></AdminLayout>
        } />
      <Route path="/manageuser" element={
        <AdminLayout><ManageUser /></AdminLayout>
        } />
      <Route path="/manageorder" element={
        <AdminLayout><ManageOrder /></AdminLayout>
        } />
    </Routes>
  )
}

export default AdminRoutes
