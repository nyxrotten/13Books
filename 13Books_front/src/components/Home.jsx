import logo from '../assets/imgs/13Books-logo.png';
import Footer from './Footer';
import Nav from './Nav'
import { Link } from 'react-router-dom';
import  '../assets/CSS/home.css';
import { usePropertyContext } from "../context/PropertyContext";


function Home({books}) {

    const { user } = usePropertyContext();

    return(
        <>
            <header className='homeHeader'>
                <img src={logo}/>
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
                <h1>Destacados</h1>
                <h3>Descubre el top ventas del mes</h3>
                <div className='destacadosHome'>
                    {books.map((book) => (
                        <div key={book.bookid} className='bookCard'>
                            <img/>
                            <div className='bookInfo'>
                                <h4>{book.title}</h4>
                                <h4>{book.author}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home;