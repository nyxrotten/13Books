import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import LogIn from './components/LogIn';
import Logout from './components/Logout';
import Register from './components/Register';
import Admin from './components/Admin';
import SingleProduct from './components/SingleProduct';
import EditPage from './components/changingComponents/EditPage';
import Carrito from './components/changingComponents/Carrito';
import Pedidos from './components/changingComponents/Pedidos';
import PedidoDetalle from './components/changingComponents/PedidoDetalle';
import Reservas from './components/changingComponents/Reservas';
import { BooksProvider } from './context/BooksContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);


  const urlBackenddev = "http://localhost:8080";
  const urlBackend = "https://one3books.onrender.com";
  let urlBase = `${urlBackend}/books`;

  useEffect(() => {
    axios.get(urlBase)
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return  <div className="loading">
              <h1>Cargando...</h1>
              <i className="fa-solid fa-spinner"></i>
            </div>;
  }

  return (
    <>
      <BooksProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home booksAll={books}/>}/>
              <Route path="/login" element={<LogIn />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/admin" element={<Admin books={books}/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/books/:id" element={<SingleProduct />} />
              <Route path="/editbook/:id" element={<EditPage />} />
              <Route path="/createbook" element={<EditPage />} />
              <Route path="/carrito" element={<Carrito books={books}/>}/>
              <Route path="/pedidos" element={<Pedidos />}></Route>
              <Route path="/pedido/:orderid" element={<PedidoDetalle />}></Route>
              <Route path="/reservas" element={<Reservas />}></Route>
              </Routes>
          </Router>
        </CartProvider>
      </BooksProvider>
    </>
  );
}

export default App;