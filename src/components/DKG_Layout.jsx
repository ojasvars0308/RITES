import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './DKG_Header'

const DKG_Layout = () => {
  return (
    <>
      {/* <Header />
      <main className='p-4 bg-offWhite min-h-[90vh] max-w-lg m-auto flex flex-col gap-4'>
        <Outlet />
      </main> */}

      <Header />
      <main className='w-[95%] flex flex-col gap-4 p-4'>
        <Outlet />
      </main>
    </>
  )
}

export default DKG_Layout