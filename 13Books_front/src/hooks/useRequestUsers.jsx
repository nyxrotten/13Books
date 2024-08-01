import axios from 'axios';

const useRequestUsers = () => {

  const urlBackenddev = "http://localhost:8080";
  const urlBackend = "https://one3books.onrender.com";
  const urlBase = `${urlBackenddev}/users`;


  const register = async  (name, surname, city, username, email, password) => {
    try {
      const response = await axios.post(`${urlBase}/register`, {name, surname, city, username, email, password});
      return response.data;
    } catch (error) {
      throw new Error(`Error en el register: ${error.message}`);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${urlBase}/login`, {email, password});
      return response.data;
    } catch (error) {
      throw new Error(`Error en el login: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${urlBase}/logout`);
      return response.data;
    } catch (error) {
      throw new Error(`Error en el login: ${error.message}`);
    }
  };

  return { register, login, logout };
};

export default useRequestUsers;
