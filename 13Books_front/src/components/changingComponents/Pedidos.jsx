import '../../assets/CSS/pedidos.css';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function Pedidos(){
    

    return (
        <>
            <Header />
            <nav className='carritoNav'>
            <div><Link className='reactLink' to={('/carrito')}>< i className="fa-solid fa-cart-shopping"/></Link></div>
            <div><p>Mis pedidos</p></div>
            </nav>
            <div className='mainBox'>
            <div className="pedidosBox">
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                </div>
                <div className="pedido">
                    <p>Fecha: </p>
                    <p>Libros: </p>
                    <p>Total: </p>
                    <p>Estado: </p>
                </div>
                
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Pedidos;