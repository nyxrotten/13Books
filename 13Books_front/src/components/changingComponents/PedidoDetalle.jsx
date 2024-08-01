import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/CSS/pedidos.css';
import { useBooksContext } from '../../context/BooksContext';
import useRequest from '../../hooks/useRequest';
import Footer from '../Footer';
import Header from '../Header';
import { useParams } from 'react-router-dom';

function PedidoDetalle() {
    const [order, setOrder] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [error, setError] = useState('');
    const { orderid } = useParams();
    const { getAuth } = useRequest();
    const { user } = useBooksContext();

    const verPedidoDetalle = async () => {
        try {
            const data = await getAuth(`${orderid}`);
            
            setOrder(data);
            setOrderData(data[0]);
            setError('');
        } catch (error) {
            console.log(error.message);
            setError('No se ha encontrado el detalle del pedido.');
        }
    };

    useEffect(() => {

        console.log(orderid);
        verPedidoDetalle();
    }, []);

    return (
        <>
            <Header />
            <nav className='carritoNav'>
                <div>
                    <Link className='reactLink' to={('/pedidos')}>
                        <i className="fa-solid fa-arrow-left" /> Volver a pedidos
                    </Link>
                </div>
            </nav>
            <div className='mainBox'>
                <div className="pedidoDetalleBox">
                    {order ? (
                        
                       <>
                       <p className='tituloPedido'>Datos del pedido</p>
                        {(user && user.role === 'admin') && (
                            <>
                            <p>Nombre de cliente: {orderData.name} </p>
                            <p>Email de cliente: {orderData.email} </p>
                            </>
                         )}
                        <p>Fecha: {orderData.order_date} </p>
                        <p>Total: {orderData.total_price} €</p>
                        <p>Estado: {orderData.status} </p>
                        <p>Fecha entrega: {orderData.delivery_date} </p>

                        {order.map((book) => (
                            <div  key={book.bookid} className="pedido">
                                <img src={book.image} alt={book.title} />
                                <p>Título: {book.title}</p>
                                <p>Price: {book.price}</p>
                                <p>Cantidad: {book.quantity}</p>
                                <p>Género: {book.genre}</p>
                            </div>
                            ))
                        }
                       </>                       
                    ) : (
                        <p>{error}</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PedidoDetalle;