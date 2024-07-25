import axios from 'axios';

const urlApi = 'http://localhost:8080/users';

export const register = async  (name, surname, city, username, email, password) => {
    const response = await axios.post(`${urlApi}/register`, {name, surname, city, username, email, password});
    return response.data;
};
  
export const login = async (email, password) => {
    const response = await axios.post(`${urlApi}/login`, {email, password});
    return response.data;
};

export const logout = async () => {
    const response = await axios.get(`${urlApi}/logout`);
    return response.data;
};

