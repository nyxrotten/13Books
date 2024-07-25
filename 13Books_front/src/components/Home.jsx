//import logo from '../assets/imgs/13Books-logo.png';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
//import SearchResult from './changingComponents/SearchResult'
import { Link } from 'react-router-dom';
import  '../assets/CSS/home.css';
//import EditPage from './changingComponents/EditPage';
//import { usePropertyContext } from '../context/PropertyContext';


function Home( {books}) {

   // const { user } = usePropertyContext();

    return(
        <>
            <Header />
            <Nav/>
            <main className='homeMain'>
                
                 {/* <div className='destacadosHomeTitulares'>
                    <div>
                        <h1>Destacados</h1>
                        <h3>Descubre el top ventas del mes</h3>
                    </div>
                </div>
                    <div className='destacadosHomeLibros'>
                    {books.map((book) => (
                        
                        <div key={book.bookid} className='bookCardDestacados'>
                            <Link className='reactLink' to={`/books/${book.bookid}`}>
                            <img src={book.image}  alt={book.title}/>
                            <div className='bookInfo'>
                                <h4>{book.title}</h4>
                                <h5>{book.author}</h5>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div> */}
            </main>
            <Footer />
        </>
    )
}

export default Home;
