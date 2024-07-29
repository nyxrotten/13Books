import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../context/BooksContext';

const useRequest = () => {
  const { setUser } = useBooksContext();
  const navigate = useNavigate();
  
  const urlBase = 'http://localhost:8080/books';

  let config = {};
  const loginLocalStorage = JSON.parse(localStorage.getItem('login'));
  if (loginLocalStorage !== null && loginLocalStorage.user !== null) {
      const token = loginLocalStorage.token;
      config =  { headers: { 'x-access-token': token } };      
  }

  const get = async (url) => {
    try {
      const response = await axios.get(`${urlBase}/${url}`);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Error en el GET: ${error.message}`);
    }
  };

  const post = async (data) => {
    try {
      
      const response = await axios.post(`${urlBase}`, data, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
        navigate('/');
      }
      throw new Error(`Error en el POST: ${error.message}`);
      
    }
  };

  const put = async (url, data) => {
    try {
      const response = await axios.put(`${urlBase}/${url}`, data, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
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
        navigate('/');
      }
      throw new Error(`Error en el PATCH: ${error.message}`);
    }
  };

  const remove = async (url) => {
    try {
      console.log(`estoy en delete ${urlBase}/${url}`);
      const response = await axios.delete(`${urlBase}/${url}`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('La sesión ha caducado! Debe iniciar sesión de nuevo.');
        localStorage.removeItem('login');
        setUser({});
        navigate('/');
      }
      throw new Error(`Error en el DELETE: ${error.message}`);
    }
  };

  return { get, post, put, patch, remove };
};

export default useRequest;