import { useState } from 'react';
import Header from '../Header.jsx';
import '../../assets/CSS/carrito.css';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../../context/BooksContext';
import { useCartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';

function Carrito(){

    const [error, setError] = useState('');
    const { shoppingCart, setShoppingCart, removeFromShoppingCart } = useCartContext();
    const { user } = useBooksContext();
    const { post } = useRequest();
    const navigate = useNavigate();

    const realizarPago = async () => {
        try {
            const myOrder = shoppingCart.map(book => ({
                bookid: book.bookid,
                amount: book.amount,
                price: (book.price * book.amount).toFixed(2),
            }))

            const data = {
                userId: user.clientid,
                total: totalAPagar,
                order: myOrder
            };

            console.log(data);
            const response = await post(data, 'orders');
        
            alert('El pedido se ha creado correctamente!'); 
            setShoppingCart([]);
            setError('');
            navigate('/');
        } catch (error) {
            console.log(error.message);
            setError('No se ha podido crear el pedido. Inténtalo más tarde.');
        }
    };

    const totalProductos = shoppingCart.reduce((total, book) => total + book.amount, 0);
    const totalAPagar = shoppingCart.reduce((total, book) => total + ((book.price * book.amount) + 2.99), 0).toFixed(2);

    return(
        <>
        <Header />
        <nav className='carritoNav'>
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-house"/></Link></div>
            <div><p>Carrito</p></div>
        </nav>
        <div className='searchErrorMessage'>
            {error && <p>{error}</p>}
        </div>
        <main className='carritoMain'>
                
            <div className='carritoBox'>

                <div className='carritoFirstBox'>
                    <Link to='/pedidos' className='reactLink'>
                        <button className='todosPedidos'>Ver todos mis pedidos</button>
                    </Link>
                </div>
                <div className='carritoLista'>
                    {shoppingCart.length === 0 ? (
                        <div className='carritoVacio'>
                            <p>El carrito está vacío</p>
                        </div>
                    ) : (
                        shoppingCart.map(book => (
                            <div key={book.bookid} className="carritoItem">
                                <img src={book.image} alt={book.title} />
                                <div className="carritoInfo">
                                    <p>{book.title}</p>
                                    <p>{book.author}</p>
                                    <p>{(book.amount === 1 ? book.price :((book.price * book.amount).toFixed(2)))} €</p>
                                    <p>{book.amount} {(book.amount === 1 ? 'unidad' : 'unidades')}</p>
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
                        <div className='totalCarrito'>{totalProductos} {totalProductos === 1 ? 'producto + envío' : 'productos + envío'} - {totalAPagar} €</div>
                        <button className='pagarCarrito' onClick={realizarPago}>PAGAR <i className="fa-solid fa-credit-card" /></button>
                    </div> 
            </div>
        </main>
      
                  
        
        </>
    )
}

export default Carrito;