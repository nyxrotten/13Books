import logo from '../assets/imgs/13Books-logo.png';
import Nav from'./Nav';
import '../assets/CSS/admin.css'
import {Link} from 'react-router-dom'

function Admin( {books} ) {
    return (
        <>
        <header className='adminHeader'>
                <img src={logo}/>
                <div className='adminNav'>
                    <button className='logAdmin'> <Link className='reactLink' to={('/login')}>Admin</Link></button>
                    <button className='logLock'> <Link className='reactLink' to={('/login')}><FontAwesomeIcon icon="fa-solid fa-lock" /></Link></button>
                </div>
        </header>
        <Nav/>
        <main className='adminMain'>
        {books.map(book => (
                        <div key={book.id} className='bookCardAdmin'>
                            <img/>
                            <div className='bookCardAdminInfo'>
                                <h4>{book.name}</h4>
                                <p>{book.author}</p>
                                <p>{book.isbn}</p>
                                <p>{book.genre}</p>
                                <p>{book.stock}</p>
                                <p>{book.price}</p>
                            </div>
                            <button className='cardInfoEdit'> <Link className='reactLink' to={('/login')}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></Link></button>
                        </div>
                    ))}

        </main>
        
        </>
    )
}

export default Admin;