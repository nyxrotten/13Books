import { Link } from 'react-router-dom';
import '../assets/CSS/header.css';
import '../assets/CSS/home.css';
import logo from '../assets/imgs/13Books-logo.png';
import { useBooksContext } from '../context/BooksContext';
import HeaderAdmin from './HeaderAdmin';


function Header() {
    const { user } = useBooksContext();

    function refresh() {
        window.location.reload();
    }
    return(
        <>
            <header className='homeHeader'>
                <img src={logo} onClick={ refresh }/>
                <div className='log'>
                {user && user.username ? (

                        (user && user.role === 'admin') ? (
                                <>
                                    <HeaderAdmin/>
                                  
                                </>
                        ):
                        ( 
                            <>
                              <div className='logued'>
                                <h3>Bienvenid@, {user.username}</h3>
                                
                                <Link to={'/carrito'} className='reactLink'>
                                    <div className='counterCarrito'><p>0</p></div>
                                    <i className="fa-solid fa-cart-shopping" />
                                </Link>
                                </div>
                                <div>
                                    <button className='logHome'> <Link className='reactLink' to={('/logout')}>LogOut</Link></button> 
                                </div>  
                            </>
                        )
                       
                    ) : (
                        <>
                        <button className='logHome'> <Link className='reactLink' to={('/login')}>LogIn</Link></button>
                        <button className='logHome'><Link className='reactLink'to={('/register')}>Registro</Link></button>
                        </>
                    )}
                </div>
            </header>

        </>
    )
}


export default Header;
