import '../../assets/CSS/pedidos.css';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useBooksContext } from '../../context/BooksContext';


function Pedidos(){
    
    const { user } = useBooksContext();

    return (
        <>
            <Header />
            <nav className='carritoNav'>
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-shopping-cart"/></Link></div>
                {(user && user.role === 'admin') ? (
                    <div><p>Pedidos</p></div>
                ) : (
                    <div><p>Mis pedidos</p></div>
                )}
            </nav>
            <div className='mainBox'>
            <div className="pedidosBox">
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                    <button className='checkPedido'>
                    <i className="fa-solid fa-circle-xmark"/>
                    </button>
                    
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                    <i className="fa-solid fa-circle-check" />
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                    <i className="fa-solid fa-circle-check" />
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                    <i className="fa-solid fa-circle-check" />
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                    <i className="fa-solid fa-circle-check" />
                </div>
                
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Pedidos;