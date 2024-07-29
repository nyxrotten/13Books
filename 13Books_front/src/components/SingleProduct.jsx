
import Header from './Header';
import Footer from './Footer';
import  '../assets/CSS/singleProduct.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';

function SingleProduct(){

    const { id } = useParams();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { get } = useRequest();
    const [book, setBook] = useState({});

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
        return <div>Cargando...</div>;
    }

    const anioPublicacion = (book.publication_date) ? new Date(book.publication_date).getFullYear() : '';

    return(
        <>
            <Header />
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
                  </div>
                </div>
            </main>
            <Footer />
        </>
    )

}

export default SingleProduct;