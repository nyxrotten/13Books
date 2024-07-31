
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../context/BooksContext';
import { useCartContext } from '../context/CartContext';
import useRequestUsers from '../hooks/useRequestUsers';


const Logout = () => {
    const { setUser } = useBooksContext();
    const { setShoppingCart } = useCartContext();
    const navigate = useNavigate();
    const { logout } = useRequestUsers();

    const doLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('login');
            setUser({});
            setShoppingCart([]);
            navigate('/');
        } catch (err) {
            console.error('Error en el cierre de sesión:', err.message);
        }
    };

    useEffect(() => {
        doLogout();    
    }, [setUser]);

  return  <></>;
};

export default Logout;