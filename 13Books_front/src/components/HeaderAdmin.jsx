
import { Link } from 'react-router-dom';
import '../assets/CSS/header.css';
import { useBooksContext } from '../context/BooksContext';


function HeaderAdmin() {
    const { user } = useBooksContext();
    return(
        <>
            <div className='adminHead'>
                <div className='adminHeader'>
                <h3>Bienvenid@, admin {user.username}</h3>
                <Link to={'/pedidos'} className='reactLink' alt="Pedidos">
                    <i className="fa-solid fa-truck" />
                </Link>
                <Link to={'/reservas'} className='reactLink' alt="Reservas">
                    <i className="fa-solid fa-book"/>
                </Link>
                </div>
                <div>
                    <button className='logHome'> <Link className='reactLink' to={('/logout')}>LogOut</Link></button>
                </div>
                
            </div>
        </>
    )
}

export default HeaderAdmin;