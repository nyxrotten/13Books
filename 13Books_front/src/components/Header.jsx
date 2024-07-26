import  '../assets/CSS/home.css';
import logo from '../assets/imgs/13Books-logo.png';
import { usePropertyContext } from '../context/PropertyContext';
import { Link } from 'react-router-dom';


function Header() {
    const { user } = usePropertyContext();

    return(
        <>
            <header className='homeHeader'>
                <Link to={'/'}><img src={logo}/></Link>
                <div className='log'>
                {user && user.username ? (
                        <div className='logued'>
                        <h3>Bienvenid@, {user.username}</h3>
                        
                        <Link to={'/carrito'} className='reactLink'>
                            <div className='counterCarrito'><p>0</p></div>
                            <i className="fa-solid fa-cart-shopping" />
                        </Link>
                        {/* <button className='logHome'> <Link className='reactLink' to={('/logout')}>LogOut</Link></button> */}
                        </div>
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