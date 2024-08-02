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
            <div><Link className='reactLink' to={('/pedidos')}>< i className="fa-solid fa-arrow-left"/></Link></div>
                    <div><p>Pedidos</p></div>
            </nav>
            <div className='mainBoxDetallePedidos'>
                <div className="pedidoDetalleBox">
                    {order ? (
                        <>
                        <div className='detallesPedidoCliente'>
                        <h4>Datos del pedido</h4>
                        {(user && user.role === 'admin') && (
                            <div>
                            <p>Nombre de cliente: {orderData.name} </p>
                            <p>Email de cliente: {orderData.email} </p>
                            </div>
                        )}
                        <p>Fecha: {orderData.order_date} </p>
                        <p>Total: {orderData.total_price} €</p>
                        <p>Estado: {orderData.status} </p>
                        <p>Fecha entrega: {orderData.delivery_date} </p>
                        </div>
                        <div className='detallesPedidoLibrosBox'>
                        {order.map((book) => (
                            <div  key={book.bookid} className="detallesPedidoLibros">
                                <div><img src={book.image} alt={book.title} /></div>
                                <div>
                                <p>{book.title}</p>
                                <p>Cantidad: {book.quantity}</p>
                                </div>
                            </div>
                            ))
                        }
                        </div>
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