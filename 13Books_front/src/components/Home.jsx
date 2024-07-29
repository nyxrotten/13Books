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
           
            setBooksDestacados(booksRandom);
        }
          
    }, []);
    

    return( 
        <>
            <Header/>
            <Nav/>
            <Main/>
              <main className='homeMain'>
                <div className='destacadosHomeTitulares'>
                    <div>
                        <h1>Destacados</h1>
                        <h3>Descubre el top 3 ventas del mes</h3>
                    </div>
                    {booksDestacados.map(book => (
                        <div key={book.bookid} className='bookCardDestacados'>
                            <Link className='reactLink'  to={`/books/${book.bookid}`}>
                                <img src={book.image}/>
                                <div className='bookInfo'>
                                    <h4>{book.title}</h4>
                                    <h4>{book.author}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                    
                </div>
            </main> 
            <Footer />
        </>
    )
}

export default Home;
