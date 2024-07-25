import React, { useState } from 'react';
import axios from 'axios';
import  '../assets/CSS/nav.css';
import { usePropertyContext } from "../context/PropertyContext";


function Nav () {
    const [genre, setGenre] = useState('');
    const [searchText, setSearchText] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
  
    const handleSearch = async (urlApi) => {
        console.log(urlApi);
        try {
          const response = await axios.get(urlApi);
          setBooks(response.data);
          setError('');
        } catch (err) {
          console.log(err.message);
          setError('No se han encontrado libros para esta búsqueda.');
          setBooks([]);
        }
      };
      
    const handleSearchButton = () => {
        //const queryParams = new URLSearchParams();
       // queryParams.append('searchtext', searchText);
        //const apiUrl = `http://localhost:8080/books/search?${queryParams.toString()}`;
        setSearchText(searchText.toLowerCase());
        const apiUrl = `http://localhost:8080/books/search/${searchText}`;
        handleSearch(apiUrl);
      };


    const handleSearchGenre = (genre) => {
        setGenre(genre.toLowerCase());
        const apiUrl = `http://localhost:8080/books/genre/${genre}`;
        handleSearch(apiUrl);
      };

    
    return (
        <>
        <nav className='etiquetas'>
                <ul>
                    <li onClick={() => handleSearchGenre('No-Ficción')}>No-Ficción</li>
                    <li onClick={() => handleSearchGenre('Fantasía')}>Fantasía</li>
                    <li onClick={() => handleSearchGenre('Histórica')}>Histórica</li>
                    <li onClick={() => handleSearchGenre('Romántica')}>Romántica</li>
                    <li onClick={() => handleSearchGenre('Terror')}>Terror</li>
                    <li onClick={() => handleSearchGenre('Novela Negra')}>Novela Negra</li>
                    <li onClick={() => handleSearchGenre('Poesía')}>Poesía</li>
                    <li onClick={() => handleSearchGenre('Cómic')}>Cómic</li>
                    <li onClick={() => handleSearchGenre('Ciencia Ficción')}>Ciencia Ficción</li>
                </ul>
                <div className='search'>
                <input
                    className='searchInput'
                    placeholder=' Buscar por título, autor, género o isbn'
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}/>
                <button onClick={handleSearchButton}>Buscar</button>
                </div>
            </nav>
            <div className='searchErrorMessage'>
              {error && <p>{error}</p>}
            </div>
            <div className="searchResult">
              <div className='searchResultBooks'>
             
                  {books.map(book => (
                          <div key={book.bookid} className='bookCard'>
                              <img/>
                              <div className='bookInfo'>
                                  <h4>{book.title}</h4>
                                  <h4>{book.author}</h4>
                              </div>
                              </Link>
                          </div>
                  
                      ))}
                     
              </div>
          </div>
        </>
    )
}

export default Nav;

