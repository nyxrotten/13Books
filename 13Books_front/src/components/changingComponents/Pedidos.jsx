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
                           {
                            (user && user.role === 'admin') && (
                                <>
                                <p>Nombre de cliente: {order.name} </p>
                                <p>Email de cliente: {order.email} </p>
                                </>
                             )}
                            <p>Fecha: {order.order_date} </p>
                            <p>Libros: {order.quantity}</p>
                            <p>Total: {order.total_price} €</p>
                            <p>Estado: {order.status} </p>
                            <p>Fecha entrega: {order.delivery_date} </p>  
                            {(user && user.role === 'admin') && (          
                                <>        
                                    <button className='checkPedido' onClick={() => borrarPedido(order.orderid)}>
                                        <i className="fa-solid fa-circle-xmark"></i>        
                                    </button>
                                    {(order.status !== 'ENTREGADO' && 
                                        <button className='changePedido' onClick={() => modificarEstado(order.orderid)}>
                                            <i className="fa-solid fa-circle-check"></i>        
                                        </button>
                                    )}
                                </>
                            )}
                            <button className='detallePedido' onClick={() => navigate(`/pedido/${order.orderid}`)}>
                                Ver Detalle
                            </button>
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

  