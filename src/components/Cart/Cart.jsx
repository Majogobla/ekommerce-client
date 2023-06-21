import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../helpers';
import Swal from 'sweetalert2';
import axios from 'axios';

function Cart() 
{
  const { cart, setCart, addProduct, deleteProduct } = useCart();
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() =>
  {
    const newTotal = cart.reduce((totalState, product) => totalState + (product.price * product.quantity), 0);
    
    setTotal(newTotal);
  },
  [cart]);

  const handleDelete = id =>
  {
    Swal.fire(
    {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => 
    {
      if (result.isConfirmed) 
      {
        deleteProduct(id);

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  const editProduct = (id, type) =>
  {
    const product = cart.filter(productState => productState.id === id);
    if(product.length > 0)
    {
      if(type)
      {
        const newQunatity = product[0].quantity + 1;
        addProduct(product[0], newQunatity);
      }
      else
      {
        const newQunatity = product[0].quantity > 1 ? product[0].quantity - 1 : 1;
        addProduct(product[0], newQunatity);
      }
    }
  }

  const handleCompleteOrder = async () => 
  {
    const newOrder =
    {
      total,
      products: cart.map(product => ({id: product.id, quantity: product.quantity})),
    } 

    try 
    {
      const url = 'http://localhost:8000/api/orders';
      await axios.post(url, newOrder);

      Swal.fire(
        'Order completed!',
        'Your orders has been sent!',
        'success'
      );
      
      setCart([]);
      setTotal(0);

      navigate('/orders');
    } 
    catch (error) 
    {
      console.log(error);  
    }
  }

  return (
    <main className='container mx-auto my-10 px-6 mb-10 flex-1'>
        {
          cart.length > 0 ?
          (
            <>
              <h2 className='text-center text-2xl font-black uppercase'>Shopping Cart</h2>

              <div className='mt-4 flex flex-col gap-4'>
                {
                  cart.map(product =>
                  (
                    <div key={product.id} className='flex flex-col md:flex-row gap-6 items-center'>
                      <div className='w-full md:w-1/5  h-32 overflow-hidden'>
                        <img src={`http://localhost:8000/storage/${product.image}`} alt="image product" />
                      </div>

                      <div className='w-full md:w-2/5 flex flex-col items-center md:items-start'>
                        <h3 className='font-black text-indigo-800 text-xl'>{product.name}</h3>
        
                        <p className='font-bold uppercase text-sm'>Quantity: <span className='font-black text-indigo-800'>{product.quantity}</span></p>
        
                        <p className='font-bold uppercase text-sm'>Price: <span className='font-black text-indigo-800'>{formatPrice(product.price)}</span></p>
        
                        <p className='font-bold uppercase text-sm'>Sub-Total: <span className='font-black text-indigo-800'>{formatPrice(product.price * product.quantity)}</span></p>
                      </div>

                      <div className='w-full md:w-1/5 flex flex-row gap-4 items-center justify-center'>
                        <button className='bg-indigo-800 rounded-full items-center flex justify-center p-2 hover:bg-yellow-500 transition-colors' onClick={() => editProduct(product.id, false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>

                        <p className='text-4xl font-black text-ind-800igo'>{product.quantity}</p>

                        <button className='bg-indigo-800 rounded-full items-center flex justify-center p-2 hover:bg-yellow-500 transition-colors' onClick={() => editProduct(product.id, true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
        
                      <div className='w-full md:w-1/5 flex justify-center md:justify-end'>
                        <button className='p-2 bg-red-600 rounded-full hover:bg-red-800 cursor-pointer transition-colors' onClick={() => handleDelete(product.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                }

                <div className='flex flex-col gap-4 md:items-end mt-10'>
                  <div className='px-6 py-4 bg-yellow-500 rounded w-full'>
                    <p className='text-indigo-800 text-center font-black text-2xl'>Total: {formatPrice(total)}</p>
                  </div>

                  <button className='px-6 py-4 bg-indigo-800 rounded text-yellow-500 text-center font-black text-2xl uppercase hover:bg-yellow-500 hover:text-indigo-800 cursor-pointer transition-colors' onClick={handleCompleteOrder}>Complete Order</button>
                </div>
              </div>
            </>
          ):
          (
            <p className='text-center text-indigo-800 text-4xl font-black uppercase'>Shopping Cart is Empty</p>
          )
        }
    </main>
  )
};

export default Cart;