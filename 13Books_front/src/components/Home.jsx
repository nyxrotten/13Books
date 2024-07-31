
import { useEffect } from 'react';
import { useBooksContext } from '../context/BooksContext';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import Destacados from './changingComponents/Destacados';

import '../assets/CSS/home.css';

function Home( {booksAll} ) {
    const {books} = useBooksContext();
    const { user } = useBooksContext();

    useEffect(() => {
        console.log('estoy en home');
      console.log(user);
          
    }, []);

    return(
        <>
            <Header/>
            <Nav />
            <Main/>
            <>
            {((user && user.role === 'user') || (user.username === undefined)) && (books.length === 0) ? <Destacados booksAll={booksAll}/> : <></>}
            </>
            <Footer />
        </>
    )
}

export default Home;
