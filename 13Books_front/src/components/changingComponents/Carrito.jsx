import { useEffect } from 'react';
import Header from '../Header.jsx';
import '../../assets/CSS/carrito.css';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

function Carrito(){

    const { shoppingCart, removeFromShoppingCart } = useCartContext();

    useEffect(() => {
        console.log('estoy en carrito: ');
        console.log(shoppingCart);
      }, []);


    const totalProductos = shoppingCart.reduce((total, book) => total + book.amount, 0);
    const totalAPagar = shoppingCart.reduce((total, book) => total + (book.price * book.amount), 0).toFixed(2);

    return(
        <>
        <Header />
        <nav className='carritoNav'>
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-house"/></Link></div>
            <div><p>Carrito</p></div>
        </nav>
        <main className='carritoMain'>
                
            <div className='carritoBox'>
               
                <div className='carritoFirstBox'>
                    <Link to='/pedidos' className='reactLink'>
                        <button className='todosPedidos'>Ver todos mis pedidos</button>
                    </Link>
                </div>
                <div className='carritoLista'>
                    {shoppingCart.length === 0 ? (
                        <div>
                            <p>El carrito está vacío</p>
                        </div>
                    ) : (
                        shoppingCart.map(book => (
                            <div key={book.bookid} className="carritoItem">
                                <div>
                                 <img src={book.image} alt={book.title} />
                                </div>
                                <div className="carritoItnfo">
                                    <p>{book.title}</p>
                                    <p>{book.author}</p>
                                    <p>{(book.amount === 1 ? book.price :((book.price * book.amount).toFixed(2)))} €</p>
                                    <p>{book.amount} {(book.amount === 1 ? 'unidad' : 'unidades')}</p>
                                </div>
                                <div>
                                    <button onClick={() => removeFromShoppingCart(book.bookid)}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        ))
                    )}

                </div>
                <div className='envioBox'>
                    <i className="fa-solid fa-truck"></i>
                    <div>
                    <p>Gastos de envío</p>
                    <p> 2.99 €</p>
                    </div>
                </div>
                    <div className='botonesCarrito'>
                        <div className='totalCarrito'>{totalProductos} {totalProductos === 1 ? 'producto' : 'productos'} - {totalAPagar} €</div>
                        <button className='pagarCarrito'>PAGAR <i className="fa-solid fa-credit-card" /></button>
                    </div> 
            </div>
        </main>
      
                  
        
        </>
    )
}

export default Carrito;