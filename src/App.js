import React from 'react';
import Routes from './pages/route/Routes';
import image from './assets/images/bgImage.png'

function App() {
  return (
    <div
      // className="min-h-screen bg-cover bg-center"
      // style={{
      //   backgroundImage: `url(${image})`, // Path to your background image in the public folder
      // }}
      className='bg-zinc-100 bg-cover w-[700px] max-w-[100%] lg:p-10 md:p-10 sm:p-12 sm:w-[600px] xs:w-[500px] container shadow-[0_0_10px_rgba(0,0,0,0)] border border-stone-300 rounded-2xl'
    >
      <div className='flex flex-col items-center w-full'>
        <Routes />
      </div>
    </div>
  );
}

export default App;
// pt-10 pl-32 pr-32 pb-10 