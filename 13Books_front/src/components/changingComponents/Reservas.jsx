import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/CSS/pedidos.css';
import { useBooksContext } from '../../context/BooksContext';
import useRequest from '../../hooks/useRequest';
import Footer from '../Footer';
import Header from '../Header';
import { useParams } from 'react-router-dom';

function Reservas() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const { clientId } = useParams();
    const { getAuth, remove } = useRequest();
    const { user } = useBooksContext();

    const verReservas = async (apiUrl) => {
        try {

            const data = await getAuth(apiUrl,'bookings');
            setBookings(data);
        } catch (error) {
            console.log(error.message);
            setError('No hay reservas que mostrar en estos momentos');
        }
    };

    const borrarReserva = async (bookingid) => {
        if (bookingid > 0)
        {
            if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
                try {
                    const response = await remove(`${bookingid}`, 'bookings');
                    alert('La reserva se ha eliminado correctamente!');
                    setBookings((bookings) => bookings.filter(booking => booking.bookingid !== bookingid));
                    navigate('/reservas'); 
                } catch (error) {
                    console.log(error.message);
                    setError('No se ha podido eliminar la reserva. Inténtalo más tarde.');
                }
            }
        }
    }

    useEffect(() => {
        console.log(clientId);
        let apiUrl = '';
        if (user && user.role === 'user') {
            apiUrl += `${user.clientid}`;
        }

        verReservas(apiUrl);  
       
    }, []);

    return (
        <>
            <Header />
            <nav className='carritoNav'>
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-home"/></Link></div>
                <div><p>Reservas</p></div>
            </nav>
            <div className='mainBoxDetallePedidos'>
                <div className="pedidoDetalleBox">
                    
                    {bookings && bookings.length > 0 ? (
                        <>
                        <div className='detallesPedidoCliente'>
                        <h4>Reservas</h4>
                        </div>
                        <div className='detallesPedidoLibrosBox'>
                        {bookings.map((booking) => (
                            <div  key={booking.bookingid} className="detallesPedidoLibros revervaItem">
                                <div><img src={booking.image} alt={booking.title} /></div>
                                <div>
                                 {(user && user.role === 'admin') && (
                                    <>
                                    <p><b>Nombre cliente:</b> {booking.name} </p>
                                    <p><b>Email cliente:</b> {booking.email} </p>
                                    </>
                                )}
                                <p>{booking.title}</p>
                                <p><b>Fecha:</b> {booking.booking_date} </p>
                                </div>
                                {(user && user.role === 'admin') && (
                                <>
                                    <button className='checkReserva' onClick={() => borrarReserva(booking.bookingid)}>
                                        <p>Eliminar<i className="fa-solid fa-circle-xmark"></i></p>
                                    </button>
                                </>
                                )}
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

export default Reservas;