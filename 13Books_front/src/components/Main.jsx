import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/nav.css';
import '../assets/CSS/main.css';
import { useBooksContext } from '../context/BooksContext';
import { useCartContext } from '../context/CartContext';


function Main() {

    const [error, setError] = useState('');
    const { user } = useBooksContext();
    const {books, setBooks} = useBooksContext();
    const [isFirstTime, setIsFirstTime] = useState(true);
    const { addToShoppingCart } = useCartContext();

    useEffect(() => {
      
      if (!isFirstTime && books && books.length <= 0) {
        setError('Lo sentimos, no hay libros que coincidan con esa búsqueda!');
      }
      else {
        setError('');
        setIsFirstTime(false);
      }
    }, [books]);
  
    return (
        <>
            {(user && user.role === 'admin') && (<div className='createBook'>
                <Link className='reactLink' to={`/createbook`}>
                  <button className='createBookButton'>
                    Crear nuevo <i className="fa-solid fa-circle-plus"/>
                  </button>
                </Link>
                </div>)}
            <div className='searchErrorMessage'>
              {error && <p>{error}</p>}
            </div>
            <div className="searchResult">
              <div className='searchResultBooks'>
                  {books.map(book => (
                      <div key={book.bookid} className='bookCard'>
                          <Link className='reactLink'  to={`/books/${book.bookid}`}>
                            <img src={book.image}/>
                            <div className='bookInfo'>
                              <h4>{book.title}</h4>
                              <h4>{book.author}</h4>
                              {(user && user.role === 'user') ? (
                                <>
                                  <p>{book.price} €</p>
                                  <button className="botonCarrito">
                                    <Link to="" className="reactLink" onClick={(e) => {addToShoppingCart(book);}}>
                                        Añadir al carrito <i className="fa-solid fa-cart-shopping"/>
                                    </Link>
                                  </button>
                                </>
                              )
                              :
                              (user && user.role === 'admin') && (
                                <div>
                                  <button className='editButton'>
                                    <Link className='reactLink' to={`/editbook/${book.bookid}`}>
                                    Editar Libro <i className="fa-solid fa-pen-to-square"/>
                                    </Link>
                                  </button>
                                </div>
                              )}
                            </div>
                          </Link>
                      </div>
                  ))}
              </div>
          </div>
        </>
    )
}

export default Main;