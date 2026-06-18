
import React from 'react'
import { auth } from './auth'
import { DBConnection } from "./utils/config/db";
import { redirect } from 'next/navigation';
import UserNavigation from './components/UserNavigation';
import Adminpage from './admin/page';
import ProductCollection from './components/ProductCollection';
import Footer from './components/Footer';



const HomePage = async() => {
  const session = await auth()
  console.log("SESSION:", session);
  await DBConnection()
  if(!session){
     console.log("NO SESSION FOUND");
    redirect("/login")
  }

  const userName = session.username
  return (
    <div>
     {session.role === 'user' && (
      <>
      <UserNavigation userName={userName}/>
    
       <ProductCollection />
       <Footer />
      
      </>
     )}
    {session.role === "admin" && (
      <Adminpage />
    )}
    
      </div>
  )
}

export default HomePage