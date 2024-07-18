import logo from '../assets/imgs/13Books-logo.png';
import Footer from './Footer'
import { Link } from 'react-router-dom';
import  '../assets/CSS/home.css';



function Home({books}) {


    return(
        <>
            <header className='homeHeader'>
                <img src={logo}/>
                <div className='log'>
                    <button> <Link className='reactLink' to={('/login')}>LogIn</Link></button>
                    <button><Link className='reactLink'to={('/register')}>Registro</Link></button>
                </div>
            </header>
            <nav className='etiquetas'>
                <ul>
                    <li>no-ficción</li>
                    <li>fantasía</li>
                    <li>histórica</li>
                    <li>romántica</li>
                    <li>terror</li>
                    <li>novela negra</li>
                    <li>poesía</li>
                    <li>cómic</li>
                    <li>ciencia ficción</li>
                </ul>
                <div className='search'>
                <input className='searchInput' placeholder=' Buscar por título, autor, género o isbn'/>
                <button><i class="fa-solid fa-magnifying-glass" />Buscar</button>
                </div>
            </nav>
            <main className='homeMain'>
                <h1>Destacados</h1>
                <h3>Descubre el top ventas del mes</h3>
                <div className='destacadosHome'>
                    {books.map(book => (
                        <div key={book.id} className='bookCard'>
                            <img/>
                            <div className='bookInfo'>
                                <h4>{book.name}</h4>
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