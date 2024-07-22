
import { useEffect } from 'react';
import { logout } from './users/users';
import { usePropertyContext } from "../context/PropertyContext";

const Logout = () => {
    const { setUser } = usePropertyContext();

    const doLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('login');
            setUser({});
            alert('Sesión cerrada!');
        } catch (err) {
            console.error('Error en el cierre de sesión:', err.message);
        }
    };

    useEffect(() => {
        doLogout();    
    }, []);

  return  <></>;
};

export default Logout;