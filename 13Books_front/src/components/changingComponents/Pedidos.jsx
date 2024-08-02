import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/CSS/pedidos.css';
import { useBooksContext } from '../../context/BooksContext';
import useRequest from '../../hooks/useRequest';
import Footer from '../Footer';
import Header from '../Header';


function Pedidos(){
    
    const [error, setError] = useState('');
    const { user } = useBooksContext();
    const { getAuth, put, remove } = useRequest();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();


    const verPedidos = async (urlApi) => {
        
        try {
            const data = await getAuth(urlApi);

            setOrders(data);
            setError('');
        } catch (error) {
            console.log(error.message);
            setError('No se han encontrado pedidos para este cliente.');
            setOrders([]);
        }
    };

    const borrarPedido = async (orderid) => {
        if (orderid > 0)
        {
            if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
                try {
                    const response = await remove(`${orderid}`, 'orders');
                    alert('El pedido se ha eliminado correctamente!');
                    setOrders((orders) => orders.filter(order => order.orderid !== orderid));
                    navigate('/pedidos'); 
                } catch (error) {
                    console.log(error.message);
                    setError('No se ha podido eliminar el pedido. Inténtalo más tarde.');
                }
            }
        }
    }

    const modificarEstado = async (orderid) => {
        if (orderid > 0)
        {
            if (window.confirm('¿Estás seguro de que deseas cambiar el estado a Entregado?')) {
                try {
                    const data = {
                        status: 'ENTREGADO',
                    };
        
                    console.log(data);
                    const response = await put(`${orderid}`,data, 'orders');
                    alert('El pedido se ha actualizado correctamente!');
                    navigate('/pedidos'); 
                } catch (error) {
                    console.log(error.message);
                    setError('No se ha podido modificar el pedido. Inténtalo más tarde.');
                }
            }
        }
    }

    useEffect(() => {
        console.log('use efect');
        console.log(user);
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
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-truck"/></Link></div>
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

                        <div key={order.orderid} className="pedido">
                            {
                            (user && user.role === 'admin') && (
                                <>
                                <p><span>Nombre de cliente: </span>{order.name} </p>
                                <p><span>Email de cliente: </span>{order.email} </p>
                                </>
                            )}
                            <p><span>Fecha: </span> {order.order_date} </p>
                            <p><span>Libros: </span>{order.quantity}</p>
                            <p><span>Total: </span>{order.total_price} €</p>
                            <p><span>Estado: </span>{order.status} </p>
                            <p><span>Fecha entrega: </span>{order.delivery_date} </p>
                            
                            <button className='detallePedido' onClick={() => navigate(`/pedido/${order.orderid}`)}>
                                Ver Detalle
                            </button>
                            {(user && user.role === 'admin') && (
                                <>
                                    {(order.status !== 'ENTREGADO' && 
                                        <button className='changePedido' onClick={() => modificarEstado(order.orderid)}>
                                            <p>Marcar como completado<i className="fa-solid fa-circle-check"></i></p>
                                        </button>
                                    )}
                                    <button className='checkPedido' onClick={() => borrarPedido(order.orderid)}>
                                        <p>Eliminar pedido<i className="fa-solid fa-circle-xmark"></i></p>
                                    </button>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Pedidos;

  