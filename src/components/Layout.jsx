import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <>
    <Header />
    <main className='p-4 bg-offWhite min-h-[90vh] max-w-4xl m-auto flex flex-col gap-4'>
      <Outlet />
    </main>
    </>
  )
}

export default Layout