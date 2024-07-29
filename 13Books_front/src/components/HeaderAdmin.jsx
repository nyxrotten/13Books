
import { Link } from 'react-router-dom';
import '../assets/CSS/header.css';
import { useBooksContext } from '../context/BooksContext';


function HeaderAdmin() {
    const { user } = useBooksContext();

    function refresh() {
        window.location.reload();
    }
    return(
        <>
            <div className='adminHead'>
                <div className='adminHeader'>
                <h3>Bienvenid@, admin {user.username}</h3>
                </div>
                <div>
                    <button className='logHome'> <Link className='reactLink' to={('/logout')}>LogOut</Link></button>
                </div>
                
            </div>
        </>
    )
}

export default HeaderAdmin;