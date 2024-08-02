
import Header from './Header';
import Footer from './Footer';
import  '../assets/CSS/singleProduct.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';
import { useBooksContext } from '../context/BooksContext';
import { useCartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function SingleProduct(){

    const { id } = useParams();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { get } = useRequest();
    const [book, setBook] = useState({});
    const { addToShoppingCart } = useCartContext();
    const { user } = useBooksContext();

    const handleSearch = async () => {
        try {
          const data = await get(`${id}`);
          setBook(data);
          setError('');
        } catch (error) {
          console.log(error.message);
          setError('Ha ocurrido un error buscando los datos del libro. Inténtalo más tarde!');
          setBook(null);
        }
      };
      
    useEffect(() => {
        handleSearch();
      }, [id]);

    if (!book) {
        return <div className="loading">
        <h1>Cargando...</h1>
        <i className="fa-solid fa-spinner"></i>
      </div>;
    }

    const anioPublicacion = (book.publication_date) ? new Date(book.publication_date).getFullYear() : '';

    return(
        <>
            <Header />
            <nav className='carritoNav'>
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-house"/></Link></div>
            <div><p>Libro</p></div>
          </nav>
            <main className='singleProductMain'>
                <div key={book.bookid} className='singleBookCard'>
                  <div className='bookCardImg'>
                    <img src={book.image} alt={book.title} />
                  </div>
                  <div className='singleBookCardInfo'>
                    <h1>{book.title}</h1>
                    <h3>{book.author}</h3>
                    <p>{anioPublicacion}</p>
                    <p>{book.summary}</p>
                    <p><span>Stock: </span>{book.stock}</p> 
                    <h4>{book.price} €</h4>
                    <p>{book.genre}</p>
                    {(user && user.role === 'user') ? (                      
                        <Link to="" className="reactLink" onClick={(e) => {addToShoppingCart(book);}}>
                          <i className="fa-solid fa-cart-shopping"/>
                        </Link>
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
                </div>
            </main>
            <Footer />
        </>
    )

}

export default SingleProduct;