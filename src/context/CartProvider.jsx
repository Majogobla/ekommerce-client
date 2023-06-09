import { createContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({children}) 
{
  const [cart, setCart] = useState([]);

  const addProduct = (product, quantity) =>
  {
    const { name, image, price, id } = product;
    const productObject =
    {
      id,
      name,
      price,
      quantity,
      image,
    }
    setCart([...cart, productObject]);
  }

  const deleteProduct = id =>
  {
    const newCart = cart.filter(product => product.id !== id);
    setCart(newCart);
  }

  return(
    <CartContext.Provider
      value={
        {
          cart,
          addProduct,
          deleteProduct,
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