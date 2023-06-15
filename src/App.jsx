import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotAuthenticated from './components/Layouts/NotAuthenticated';
import ProductsIndex from './components/Products/ProductsIndex';
import ProductShow from './components/Products/ProductShow';
import Cart from "./components/Cart/Cart";
import OrdersIndex from "./components/Orders/OrdersIndex";

import { CartProvider } from "./context/CartProvider";

function App() 
{

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<NotAuthenticated />}>
            <Route path='/products' element={<ProductsIndex/>} />
            <Route path="/product/:id" element={<ProductShow/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<OrdersIndex/>} />

            {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
