import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../helpers';
import Spinner from '../Spinner';

function ProductShow() 
{
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [edit, setEdit] = useState(false);

  const { cart, addProduct } = useCart();

  const navigate = useNavigate();
  
  useEffect(() =>
  {
    const getProducto = async () =>
    {
      setLoading(true);

      if(id)
      {
        const url = `http://localhost:8000/api/product/${id}`;

        const result = await axios.get(url);

        if(result.data.length > 0)
        {
          setProduct(result.data[0]);
          setTotal(result.data[0].price);
        }
      }

      setLoading(false);
    }

    getProducto();
  }, 
  []);

  useEffect(() =>
  {
    if(cart.length > 0)
    {
      const productCart = cart.filter(productState => productState.id === product.id);
      
      if(productCart.length > 0)
      {
        setQuantity(productCart[0].quantity);
        setEdit(true);
      }
    }
  },
  [product]);

  useEffect(() =>
  {
    const newTotal = product.price * quantity;
    setTotal(newTotal);
  },
  [quantity, product])

  const append = () =>
  {
    setQuantity(quantity + 1);
  }

  const substract = () =>
  {
    if(quantity <= 1) return;
    setQuantity(quantity - 1);
  }

  const addToCart = () =>
  {
    addProduct(product, quantity);

    Swal.fire(
      'Success!',
      'Product Added!',
      'success'
    )

    navigate("/products");
  }

  if(loading) return(<Spinner/>);

  return (
    <div className='container mx-auto px-4'>
      {
        !loading ?
        (
          <>
            <div className='container mx-auto flex flex-col md:flex-row gap-6 mt-20 items-center'>
              <div className='w-full md:w-1/3 flex justify-center'>
                {
                  product.image ? 
                  (
                    <img src={`http://localhost:8000/storage/${product.image}`} alt="product image" className="object-cover h-full w-full rounded"/>
                  ):null
                }
              </div>
            

              <div>
                <h2 className='text-4xl font-black uppercase text-indigo-800'>{product.name}</h2>

                <p className='text-xl text-indigo-800 my-2 uppercase font-extrabold mt-6'>Description: <span className='text-black'>{product.description}</span></p>

                <p className='text-xl text-indigo-800 my-2 uppercase font-extrabold'>Sku: <span className='text-black'>{product.description}</span></p>

                <p className='text-xl text-indigo-800 my-2 uppercase font-extrabold'>Price: <span className='text-black'>{formatPrice(product.price)}</span></p>
                
                <div className='mt-6 flex gap-4 items-center'>
                  <button className='bg-indigo-800 rounded-full items-center flex justify-center p-2 hover:bg-yellow-500 transition-colors' onClick={substract}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <p className='text-4xl font-black text-ind-800igo'>{quantity}</p>

                  <button className='bg-indigo-800 rounded-full items-center flex justify-center p-2 hover:bg-yellow-500 transition-colors' onClick={append}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

                <div className='text-4xl font-black text-in my-4'>{formatPrice(total)}</div>

                <button className='bg-indigo-800 text-xl rounded-lg px-4 py-2 hover:bg-yellow-500 hover:text-black text-white transition-colors uppercase font-bold' onClick={addToCart}>{edit ? 'Save Changes' : 'Add to Cart'}</button>
              </div>
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