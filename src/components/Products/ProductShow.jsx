import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

function ProductShow() 
{
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() =>
  {
    const getProducto = async () =>
    {
      setLoading(true);
      const url = `http://localhost:8000/api/product/${id}`;

      const result = await axios.get(url);

      if(result.data.length > 0)
      {
        setProduct(result.data[0]);
      }

      setLoading(false);
    }

    getProducto();
  }, 
  []);

  if(loading) return(<Spinner/>);

  return (
    <div className='container mx-auto px-4'>
      {
        !loading ?
        (
          <>
            <h2 className='text-center text-4xl font-bold my-10'>Product: <span className='text-indigo-800'>{product.name}</span></h2>

            <div className='max-w-4xl mx-auto max-h-96 overflow-hidden'>
              <img src={`http://localhost:8000/storage/${product.image}`} alt="product image" className="w-full object-center h-full object-cover"/>
            </div>

            <div className='my-4'>
              <p className='text-xl'>{product.description}</p>
            </div>
          </>
        )
        :
        (
          <p className='text-center text-4xl uppercase text-indigo-800 font-black my-10'>Product Not Found</p>
        )
      }
    </div>
  )
}

export default ProductShow