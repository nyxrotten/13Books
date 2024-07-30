import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/CSS/header.css';
import '../assets/CSS/home.css';
import logo from '../assets/imgs/13Books-logo.png';
import { useBooksContext } from '../context/BooksContext';
import HeaderAdmin from './HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

function Header() {
    const { user } = useBooksContext();
    const navigate = useNavigate();
    const {totalBooks} = useCartContext();

    function refresh() {
        navigate('/');
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
                    ) : (
                        <>
                            <div className='logued'>
                                <h3>Bienvenid@, {user.username}</h3>
                                <Link to={'/carrito'} className='reactLink'>
                                    <div className='counterCarrito'><p>{totalBooks}</p></div>
                                    <i className="fa-solid fa-cart-shopping" />
                                </Link>
                            </div>
                            <div>
                                <button className='logHome'> <Link className='reactLink' to={('/logout')}>LogOut</Link></button> 
                            </div>
                        </>
                    )) : (
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
