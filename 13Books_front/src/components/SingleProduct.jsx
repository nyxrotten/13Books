import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import  '../assets/CSS/singleProduct.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function SingleProduct(){

    const { id } = useParams();
    const [book, setBook] = useState(null);

    const handleSearch = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/books/${id}`);
          console.log(response);
          setBook(response.data);
          setError('');
        } catch (err) {
          console.log(err.message);
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
            <main>
                
                <div key={book.bookid} >
                    <h1>{book.title}</h1>
                    <h2><span>Autor: </span>{book.author}</h2>
                    <img src={book.image} alt={book.title} />
                    <p><span>Editorial: </span>{book.editorial}</p> 
                    <p><span>Año de publicación: </span>{anioPublicacion}</p> 
                    <p><span>Genero: </span>{book.genre}</p> 
                    <p>{book.summary}</p> 
                    <p><span>Stock: </span>{book.stock}</p> 
                </div>
            </main>
            <Footer />
        </>
    )

}

export default SingleProduct;