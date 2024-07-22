import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import LogIn from './components/LogIn';
import Logout from './components/Logout';
import Register from './components/Register'
import Admin from './components/Admin'
import SingleProduct from './components/SingleProduct';
import { PropertyProvider } from './context/PropertyContext';

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
     <PropertyProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Home books={books}/>}/>
          <Route path="/login" element={<LogIn />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/admin" element={<Admin books={books}/>}/>
          <Route path="/logout" element={<Logout/>}/>
          //Esta ruta está así para poder visualizarla al para maquetar:
          <Route path="/singleproduct" element={<SingleProduct/>}/>
          </Routes>
      </Router>
    </PropertyProvider>
    </>
  );
}

export default App;
