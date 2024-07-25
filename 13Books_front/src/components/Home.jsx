import logo from '../assets/imgs/13Books-logo.png';
import Footer from './Footer';
import Nav from './Nav';
import SearchResult from './changingComponents/SearchResult'
import { Link } from 'react-router-dom';
import  '../assets/CSS/home.css';
import EditPage from './changingComponents/EditPage';
import { usePropertyContext } from '../context/PropertyContext';




function Home( {books}) {

    const { user } = usePropertyContext();

    return(
        <>
            <header className='homeHeader'>
                <Link to={'/'}><img src={logo}/></Link>
                <div className='log'>
                {user && user.username ? (
                        <>
                        <h1>Bienvenido, {user.username}</h1>
                        <button className='logHome'> <Link className='reactLink' to={('/logout')}>LogOut</Link></button>
                        </>
                    ) : (
                        <>
                        <button className='logHome'> <Link className='reactLink' to={('/login')}>LogIn</Link></button>
                        <button className='logHome'><Link className='reactLink'to={('/register')}>Registro</Link></button>
                        </>
                    )}
                </div>
            </header>
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
                        
                        <div key={book.bookid} className='bookCard'>
                            <Link className='reactLink' to={`/${book.title}`}>
                            <img src={book.image}/>
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