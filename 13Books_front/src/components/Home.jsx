
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Main from './Main';
import Destacados from './changingComponents/Destacados'

import  '../assets/CSS/home.css';

function Home( {booksAll} ) {

    return(
        <>
            <Header/>
            <Nav />
            <Main/>
            <Destacados booksAll={booksAll}/>
            <Footer />
        </>
    )
}

export default Home;
