import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function NotAuthenticated() {
  return (
    <>
      <div className='bg-indigo-800 py-4'>
        <div className='container mx-auto flex flex-col justify-center items-center md:justify-between  md:flex-row'>
          <h1 className=' text-white text-3xl font-bold'>Ekommerce</h1>

          <nav className='flex flex-col gap-4 md:flex-row mt-6 md:mt-0'>
            <Link to="/products" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>Products</Link>

            <Link to="/" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>Orders</Link>

            <Link to="#" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>Contact Us</Link>

            <Link to="/cart" className='text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </Link>
          </nav>
        </div>
      </div>

      <Outlet />
    </>
  )
}

export default NotAuthenticated