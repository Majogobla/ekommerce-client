import { createContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({children}) 
{
  const [cart, setCart] = useState([]);

  const addProduct = product =>
  {
    setCart([...cart, product]);
  }

  return(
    <CartContext.Provider
      value={
        {
          addProduct,
        }
      }
    >
        {children}
    </CartContext.Provider>
  )
}

export{
  CartProvider
};

export default CartContext;