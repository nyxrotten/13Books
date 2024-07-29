//import logo from '../assets/imgs/13Books-logo.png';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
//import SearchResult from './changingComponents/SearchResult'
import { Link } from 'react-router-dom';
import  '../assets/CSS/home.css';
//import EditPage from './changingComponents/EditPage';
import { useBooksContext } from '../context/BooksContext';
import { useEffect } from 'react';


function Home( {books} ) {

    const { user } = useBooksContext();
    const [randomNumber, setRandomNumber] = useState(0);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
     
    
    }, [])

    

    return(
        <>
            <Header />
            <Nav/>

            <main className='homeMain'>
                {(user && user.role === 'user') ?
                (<>
                    <h1>Destacados del mes</h1>
                    <p>{}</p>

                </>)
                :
                (
                    <div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    )
}

export default Home;
