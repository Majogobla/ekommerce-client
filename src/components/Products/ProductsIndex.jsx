import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductsIndex() 
{
  const [products, setProducts] = useState([]);

  useEffect(() =>
  {
    const getProducts = async () =>
    {
      const url = 'http://localhost:8000/api/products';
      const result = await axios.get(url);
      setProducts(result.data);
    }

    getProducts();
  },
  [])

  return (
    <div className='container mx-auto px-4'>
      <h2 className=' text-center text-4xl uppercase font-extrabold my-8'>Productos</h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 justify-center'>
        {
          products.map(product =>
          (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ProductsIndex