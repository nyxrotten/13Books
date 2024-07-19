import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import LogIn from './components/LogIn';
import Register from './components/Register'
import Admin from './components/Admin'
import SingleProduct from './components/SingleProduct';



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
    <Router>
      <Routes>
        <Route path="/" element={<Home books={books}/>}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/admin" element={<Admin books={books}/>}/>
        //Esta ruta está así para poder visualizarla al para maquetar:
        <Route path="/singleproduct" element={<SingleProduct/>}/>
        </Routes>
    </Router>
    </>


    // <div className="App">
    //   <h1>Lista de Libros</h1>
    //   <ul>
    //     {books.map(book => (
    //       <li key={book.id}>{book.name}</li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default App;


/*

<ul>
        {books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>*/
