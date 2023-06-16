import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({product}) 
{
  const { id, name, price, brand, image, sku, description } = product;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className='h-40 w-full overflow-hidden'>
        <img className="w-full object-center h-full object-cover" src={`http://localhost:8000/storage/${image}`} alt="Sunset in the mountains"/>
      </div>
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      <div className='py-4 px-6 flex justify-center'>
        <Link to={`/product/${id}`} className='py-2 px-4 bg-indigo-800 text-white text-center rounded text-sm hover:bg-yellow-600 transition-colors uppercase font-bold'>See Product</Link>
      </div>
    </div>
  )
}

export default ProductCard