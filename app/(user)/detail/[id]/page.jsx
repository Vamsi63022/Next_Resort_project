

import { auth } from '@/app/auth'

import UserNavigation from '@/app/components/UserNavigation'
import React from 'react'
import DynamicProduct from '../../../components/ProductDetails'

const page = async() => {
  const session = await auth()

  const userName = session.username

  return (
    <div>
      <UserNavigation userName={userName}/>
      <DynamicProduct />
    </div>
  )
}

export default page