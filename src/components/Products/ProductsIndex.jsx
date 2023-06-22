import { useState, useEffect } from 'react';
import axiosClient from '../../config/axios';
import ProductCard from './ProductCard';

function ProductsIndex() 
{
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() =>
  {
    const getProducts = async () =>
    {
      const [productsResp, categoriesResp] = await Promise.all(
      [
        axiosClient('/api/products'),
        axiosClient('/api/categories'),
      ]);

      setProducts(productsResp.data);
      setCategories(categoriesResp.data);
    }

    getProducts();
  },
  []);

  useEffect(() =>
  {
    if(category !== '')
    {
      const newProductsFilterd = [...products].filter(productState => productState.subcategory.category_id === Number(category));
      setProductsFiltered(newProductsFilterd);
      return;
    }

    setProductsFiltered([...products]);
  },
  [category, products])

  return (
    <div className='container mx-auto px-4 mb-10 flex-1'>
      <h2 className=' text-center text-4xl uppercase font-extrabold my-8'>Products</h2>

      <div className='flex flex-col md:flex-row gap-4 my-8'>
        <div className='w-full md:w-1/6'>
          <select name="category" id="category" className='w-full py-2 text-black text-center border-2 border-black rounded-lg font-black text-xl' onChange={e => setCategory(e.target.value)} value={category}>
            <option value="">All</option>

            {
              categories.map(category =>
              (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        <div className='w-full md:w-5/6'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'>
            {
              productsFiltered.map(product =>
              (
                <ProductCard 
                  key={product.id}
                  product={product}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsIndex