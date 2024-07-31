import { useState, useEffect } from 'react';
import  '../assets/CSS/nav.css';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../context/BooksContext';
import useRequest from '../hooks/useRequest';


function Nav () {
    const [genre, setGenre] = useState('');
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');
    const { user, searchCriteria, setSearchCriteria } = useBooksContext();
    const { get } = useRequest();
    const {books, setBooks} = useBooksContext();

    const handleSearch = async (urlApi) => {
      
      try {
        const data = await get(urlApi);
        setBooks(data);
        setError('');
      } catch (error) {
        console.log(error.message);
        setError('No se han encontrado libros para esta búsqueda.');
        setBooks([]);
      }
    };
      
    const handleSearchButton = () => {
        setSearchText(searchText.toLowerCase());
        setSearchCriteria(searchText);
        const apiUrl = `search/${searchText}`;
        handleSearch(apiUrl);
      };

    const handleSearchGenre = (genre) => {
        setGenre(genre.toLowerCase());
        setSearchCriteria(genre);
        const apiUrl = `genre/${genre}`;
        handleSearch(apiUrl);
      };


      useEffect(() => {
       
        if (typeof searchCriteria === 'string' && searchCriteria !== '') {
          const apiUrl = `search/${searchCriteria}`;
          handleSearch(apiUrl);
        }
          
    }, [searchCriteria]);


    return (
        <>
        <nav className='nav'>
                <ul className='etiquetas'>
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
        </>
    )
}

export default Nav;



