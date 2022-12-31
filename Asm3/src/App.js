import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPopup from './components/chat/ChatPopup';

function App() {
  const [products, setProducts] = useState([]);

  const url =
    'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

  const fetchAPI = url => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        // console.log(data[0]._id.$oid);
        const dataProducts = data.map(dataProduct => {
          return {
            id: dataProduct._id.$oid,
            name: dataProduct.name,
            price: dataProduct.price,
            category: dataProduct.category,
            short_desc: dataProduct.short_desc,
            long_desc: dataProduct.long_desc,
            img: dataProduct.img1,
            img1: dataProduct.img1,
            img2: dataProduct.img2,
            img3: dataProduct.img3,
            img4: dataProduct.img4,
          };
        });
        setProducts(dataProducts);
      });
  };

  useEffect(() => {
    fetchAPI(url);
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Home products={products} />} />
          <Route path='/shop' element={<Shop products={products} />} />
          <Route
            path='/detail/:productId'
            element={<Detail products={products} />}
          />
          <Route path='/cart' element={<Cart products={products} />} />
          <Route path='/checkout' element={<Checkout products={products} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Layout>
      <ChatPopup />
    </BrowserRouter>
  );
}

export default App;
