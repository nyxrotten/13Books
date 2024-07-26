import Header from '../Header.jsx';
import '../../assets/CSS/carrito.css';
import { Link } from 'react-router-dom';

function Carrito(){

    return(
        <>
        <Header />
        <nav className='carritoNav'>
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-house"/></Link></div>
            <div><p>Carrito</p></div>
        </nav>
        <main className='carritoMain'>
            <div className='carritoBox'>
                <div className='envioBox'>
                    <i className="fa-solid fa-truck"></i>
                    <div>
                    <p>Gastos de envío</p>
                    <p> 2.99 €</p>
                    </div>
                </div>
                    <div className='botonesCarrito'>
                        <div className='totalCarrito'>0 productos - €</div>
                        <button className='pagarCarrito'>PAGAR <i className="fa-solid fa-credit-card" /></button>
                    </div> 
            </div>
        </main>
        
        </>
    )
}

export default Carrito;