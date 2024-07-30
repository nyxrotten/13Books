import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Main from './Main';
import { Link } from 'react-router-dom';
import  '../assets/CSS/home.css';
import { useBooksContext } from '../context/BooksContext';
import { useEffect } from 'react';


function Home( {booksAll} ) {

    const { user } = useBooksContext();
    const [booksDestacados, setBooksDestacados] = useState([]); 
    
    useEffect(() => {
        if (booksAll) {
            const max = booksAll.length;  
            const booksRandom = [];
            for (let i = 0; i < 3; i++) {
                const random = Math.floor(Math.random() * max);
                booksRandom.push(booksAll[random]);
            }
        setBooksDestacados(booksRandom);}
        }, []);
    

    return(
        <>
            <Header/>
            <Nav/>
            <Main/>
            {/* <div className='destacados'>
                <div className='destacadosHomeTitulares'>
                    <h1>Destacados</h1>
                    <h3>Descubre el top 3 ventas del mes</h3>
                </div>
                <div className='boxDestacados'>
                    {booksDestacados.map(book => (
                        <Link className='reactLink'  to={`/books/${book.bookid}`}>
                            <div key={book.bookid} className='bookDestacado'>
                                <img src={book.image}/>
                                <div className='bookInfo'>
                                    <h4>{book.title}</h4>
                                    <h4>{book.author}</h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div> */}
            <Footer />
        </>
    )
}

export default Home;
