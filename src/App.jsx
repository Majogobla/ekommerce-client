import { BrowserRouter, Routes, Route } from "react-router-dom";

import Authenticated from "./components/Layouts/Authenticated";
import ProductsIndex from "./components/Products/ProductsIndex";
import ProductShow from "./components/Products/ProductShow";
import Cart from "./components/Cart/Cart";
import OrdersIndex from "./components/Orders/OrdersIndex";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import { CartProvider } from "./context/CartProvider";
import { IndexView } from "./components/Layouts/IndexView";
import UsersView from "./components/Users/UsersView";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>

          <Route path="/" element={<Authenticated />}>
            <Route path="/" element={<IndexView />} />
            <Route path="/products" element={<ProductsIndex />} />
            <Route path="/product/:id" element={<ProductShow />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrdersIndex />} />
            <Route path="/users" element={<UsersView/>}/>
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
