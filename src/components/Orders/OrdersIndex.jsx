import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import axios from "axios";

function OrdersIndex() 
{
  const [orders, setOrders] = useState([]);

  useEffect(() =>
  {
    const getOrders = async () =>
    {
      try 
      {
        const result = await axios.get('http://localhost:8000/api/orders');
        setOrders(result.data);
      } 
      catch (error) 
      {
        console.log(error);  
      }
    }
    
    getOrders();
  },
  []);

  return (
    <main className='container mx-auto my-10 px-6'>
      {
        orders.map(order =>
          (
            <div key={order.id} className="border p-2 m-2">
              <p>{formatPrice(order.total)}</p>

              <p>{order.order_sent}</p>

              <p>Porducts: </p>

              {
                order.products.map(product => 
                (
                  <div key={product.id} className="flex gap-4">
                    <p>{product.name}</p>
                    <p>{product.pivot.quantity}</p>
                    <p>{product.price}</p>
                  </div>
                ))
              }
            </div>
          )  
        )
      }
    </main>
  )
}

export default OrdersIndex