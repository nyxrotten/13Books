
import { useEffect } from 'react';
import { logout } from './users/usersapi';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from "../context/PropertyContext";

const Logout = () => {
    const { setUser } = usePropertyContext();
    const navigate = useNavigate();

    const doLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('login');
            setUser({});
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