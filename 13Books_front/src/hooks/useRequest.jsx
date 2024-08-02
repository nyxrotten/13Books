import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../context/BooksContext';
import { useCartContext } from '../context/CartContext';

const useRequest = () => {
  const { setUser } = useBooksContext();
  const { setShoppingCart } = useCartContext();
  const navigate = useNavigate();
  
  const urlBackenddev = "http://localhost:8080";
  const urlBackend = "https://one3books.onrender.com";

  let urlBase = `${urlBackenddev}/books`;
  let urlBaseOrder = `${urlBackenddev}/orders`;
  let urlBaseBooking = `${urlBackenddev}/bookings`;

  let config = {};
  const loginLocalStorage = JSON.parse(localStorage.getItem('login'));
  if (loginLocalStorage !== null && loginLocalStorage.user !== null) {
      const token = loginLocalStorage.token;
      config =  { headers: { 'x-access-token': token } };      
  }

  const get = async (url) => {
    try {
      const response = await axios.get(`${urlBase}/${url}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error en el GET: ${error.message}`);
    }
  };

  const getAuth = async (url, opc) => {
    try {
      console.log(`entro por getAuth useRequest:  /${url}`);
      if (opc && opc === 'orders') urlBase = urlBaseOrder;
      if (opc && opc === 'bookings') urlBase = urlBaseBooking;
      
      const response = await axios.get(`${urlBase}/${url}`, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
        setShoppingCart([]);
        navigate('/');
      }
      throw new Error(`Error en el GET: ${error.message}`);
    }
  };

  const post = async (data, opc) => {
    try {
      console.log(opc);
      if (opc && opc === 'orders') urlBase = urlBaseOrder;
      if (opc && opc === 'bookings') urlBase = urlBaseBooking;
      console.log(urlBase);
      const response = await axios.post(`${urlBase}`, data, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
        setShoppingCart([]);
        navigate('/');
      }
      throw new Error(`Error en el POST: ${error.message}`);
      
    }
  };

  const put = async (url, data, opc) => {
    try {
      if (opc && opc === 'orders') urlBase = urlBaseOrder;
      const response = await axios.put(`${urlBase}/${url}`, data, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
        setShoppingCart([]);
        navigate('/');
      }
      throw new Error(`Error en el PUT: ${error.message}`);
    }
  };

  const patch = async (url, data) => {
    try {
      const response = await axios.patch(`${urlBase}/${url}`, data, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
        setShoppingCart([]);
        navigate('/');
      }
      throw new Error(`Error en el PATCH: ${error.message}`);
    }
  };

  const remove = async (url, opc) => {
    try {

      if (opc && opc === 'orders') urlBase = urlBaseOrder;
      if (opc && opc === 'bookings') urlBase = urlBaseBooking;

      console.log(`estoy en delete ${urlBase}/${url}`);
      const response = await axios.delete(`${urlBase}/${url}`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
        setShoppingCart([]);
        navigate('/');
      }
      throw new Error(`Error en el DELETE: ${error.message}`);
    }
  };

  return { get, post, put, patch, remove, getAuth};
};

export default useRequest;