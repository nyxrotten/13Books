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
import { BooksProvider } from './context/BooksContext';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <>
     <BooksProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Home books={books}/>}/>
          <Route path="/login" element={<LogIn />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/admin" element={<Admin books={books}/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/books/:id" element={<SingleProduct />} />
          <Route path="/editbook/:id" element={<EditPage />} />
          <Route path="/carrito" element={<Carrito books={books}/>}/>
          </Routes>
      </Router>
    </BooksProvider>
    </>
  );
}

export default App;
