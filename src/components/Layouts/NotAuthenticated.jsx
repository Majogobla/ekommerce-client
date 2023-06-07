import React from 'react';
import { Outlet } from 'react-router-dom';

function NotAuthenticated() {
  return (
    <>
      <div className='bg-indigo-800 py-4'>
        <div className='container mx-auto flex flex-col justify-center items-center md:justify-between  md:flex-row'>
          <h1 className=' text-white text-3xl font-bold'>Ekommerce</h1>

          <nav className='flex flex-col gap-4 md:flex-row mt-6 md:mt-0'>
            <a href="/" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>Home</a>

            <a href="/products" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>Products</a>

            <a href="#" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>Contact Us</a>

            <a href="#" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>Cart</a>
          </nav>
        </div>
      </div>

      <Outlet />
    </>
  )
}

export default NotAuthenticated