import '../../assets/CSS/pedidos.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useBooksContext } from '../../context/BooksContext';
//import { useCartContext } from '../../context/CartContext';
//import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';


function Pedidos(){
    
    const [error, setError] = useState('');
    //const { shoppingCart, setShoppingCart, removeFromShoppingCart } = useCartContext();
    const { user } = useBooksContext();
    const { getAuth, remove } = useRequest();
    const [orders, setOrders] = useState([]);
    //const navigate = useNavigate();


    const verPedidos = async (urlApi) => {
        console.log('pedidos: ' + urlApi);
        try {
          const data = await getAuth(urlApi);
          console.log(data);
          setOrders(data);

         /* const librosPedidos = orders.map(order => ({
            orderid: order.orderid,
            books: 
        }))
*/
          setError('');
        } catch (error) {
          console.log(error.message);
          setError('No se han encontrado pedidos para este cliente.');
          setOrders([]);
        }
      };

      useEffect(() => {
        let apiUrl = '';      
        if (user && user.role === 'user') {
            apiUrl += `client/${user.clientid}`;
        }
       
        verPedidos(apiUrl);  
    }, []);
        

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

                {orders.length === 0 ? (
                    <div className='carritoVacio'>
                        <p>El cliente no tiene pedidos actualmente.</p>
                    </div>
                ) : (
                    orders.map(order => (

                        <div  key={order.orderid} className="pedido">
                            <p>Fecha: {order.order_date} </p>
                            <p>Libros: {order.quantity}</p>
                            <p>Total: {order.total_price} €</p>
                            <p>Estado: {order.status} </p>
                            <p>Fecha entrega: {order.delivery_date} </p>
                            <button className='checkPedido'>
                            <i className="fa-solid fa-circle-xmark"/>
                            </button>
                         </div>
                    ))
                )}
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

   {/* <div key={book.bookid} className="carritoItem">
                            <img src={book.image} alt={book.title} />
                            <div className="carritoInfo">
                                <p>{book.title}</p>
                                <p>{book.author}</p>
                                <p>{(book.amount === 1 ? book.price :((book.price * book.amount).toFixed(2)))} €</p>
                                <p>{book.amount} {(book.amount === 1 ? 'unidad' : 'unidades')}</p>
                                <button onClick={() => removeFromShoppingCart(book.bookid)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                            
                        </div> */}