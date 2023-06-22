import { formatPrice } from "../../helpers";

function OrderCard({order}) 
{
  const {total, order_sent, products, id } = order;
  
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg border-indigo-800 border-2 flex flex-col justify-between">
      <div className="px-6 py-4">
        <p className="uppercase text-xl text-indigo-800 font-extrabold text-center">Order ID: <span className="text-black">{id}</span></p>

        <p className="uppercase text-base text-indigo-800 font-extrabold mt-5">Status: <span className="text-black">{order_sent}</span></p>

        <p className="uppercase text-base text-indigo-800 font-extrabold mt-5">Porducts: </p>

        <ul className="pl-4">
          {
            products.map(product => 
            (
              <li key={product.id} className="flex gap-4 justify-between mt-2">
                <p className=" text-indigo-700 font-black">{product.pivot.quantity} X <span className="text-black uppercase">{product.name}</span> <span className=" text-sm">({formatPrice(product.price)})</span></p>

                <p className="font-black text-lg pr-4">{formatPrice(Number(product.price) * (product.pivot.quantity))}</p>
              </li>
            ))
          }
        </ul>
      </div>
      
      <div className="w-full bg-indigo-800">
        <p className="py-2 text-2xl text-white text-center font-extrabold">Total: <span className=" text-yellow-500">{formatPrice(total)}</span></p>
      </div>
    </div>
  )
};

export default OrderCard;