import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminNavbar from '../components/AdminNavbar'
import AddProducts from '../components/AddProducts'



const AdminPage = async() => {

  const session = await auth()

  if(!session){
    redirect("/login")
  }



  return (
      <div>
        {session.role === 'admin' ? (
          <>
          <AdminNavbar />
          <AddProducts />

          </>
        ) : <div align="center">
          <h1>Not Authorized</h1>
          <Link href="/login"> Login</Link>
        </div>
      }
      </div>
   
  )
}

export default AdminPage