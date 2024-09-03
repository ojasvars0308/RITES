import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <>
    <Header />
    <main className='pt-4 px-4 bg-offWhite min-h-[94vh] max-w-4xl m-auto'>
      <Outlet />
    </main>
    </>
  )
}

export default Layout
