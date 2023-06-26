import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import OrderCard from "./OrderCard";

function OrdersIndex() 
{
  const [orders, setOrders] = useState([]);

  useEffect(() =>
  {
    const getOrders = async () =>
    {
      try 
      {
        const result = await axiosClient('/api/orders');
        
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
    <main className='container mx-auto my-10 px-6 mb-10 flex-1'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          orders.map(order =>
            (
              <OrderCard
                key={order.id}
                order={order}
              />
            )  
          )
        }
      </div>
    </main>
  )
}

export default OrdersIndex