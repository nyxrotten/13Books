//import logo from '../assets/imgs/13Books-logo.png';
import { useState } from 'react';
import Header from './Header';

import Footer from './Footer';
import Nav from './Nav';
import Main from './Main';
//import SearchResult from './changingComponents/SearchResult'
import { Link } from 'react-router-dom';
import  '../assets/CSS/home.css';
//import EditPage from './changingComponents/EditPage';
import { useBooksContext } from '../context/BooksContext';
import { useEffect } from 'react';


function Home( {books} ) {

    const { user } = useBooksContext();
    const [randomNumber, setRandomNumber] = useState(); 
    
    const max = books.length;  
    const random = Math.floor(Math.random() * max);
 
    
 
    useEffect(() => {
        
        setRandomNumber (random);
       
    }, [])   

    

    return( 
        <>
        <Header/>
        
            <Nav/>
            <Main/>
             {/* <main className='homeMain'>
                {books.map(book => (
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

            </main> */}
            
            
                
            <Footer />
        </>
    )
}

export default Home;


/*    {(user && user.role === 'user') ? (
            <>
          <Header />
                <Nav/>
                <p>Home del user</p>
            </>
            ):
            (user && user.role === 'admin') && (
            <>

            <HeaderAdmin />*/