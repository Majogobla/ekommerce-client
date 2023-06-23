import { BrowserRouter, Routes, Route } from "react-router-dom";

import Authenticated from "./components/Layouts/Authenticated";
import ProductsIndex from "./components/Products/ProductsIndex";
import ProductShow from "./components/Products/ProductShow";
import Cart from "./components/Cart/Cart";
import OrdersIndex from "./components/Orders/OrdersIndex";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { IndexView } from "./components/Layouts/IndexView";
import UsersView from "./components/Users/UsersView";
import UserEdit from "./components/Users/UserEdit";
import UserShow from "./components/Users/UserShow";
import UserEditImage from "./components/Users/UserEditImage";

import { CartProvider } from "./context/CartProvider";

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
            <Route path="/user" element={<UserShow/>}/>
            <Route path="/user/edit" element={<UserEdit/>}/>
            <Route path="/user/image" element={<UserEditImage/>}/>
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
