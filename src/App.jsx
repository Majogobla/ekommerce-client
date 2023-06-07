import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotAuthenticated from './components/Layouts/NotAuthenticated';
import ProductsIndex from './components/Products/ProductsIndex';
import ProductShow from './components/Products/ProductShow';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotAuthenticated />}>
          <Route path='/products' element={<ProductsIndex/>} />
          <Route path="/product/:id" element={<ProductShow/>} />

          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
