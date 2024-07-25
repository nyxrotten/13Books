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
                        <>
                        <h1>Bienvenid@, {user.username}</h1>
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

        </>
    )
}

export default Header;