import axios from 'axios';

const urlApi = 'http://localhost:8080/users';

export const register = async  (username, email, password) => {
   /* console.log('username: ' + username);
    console.log('email: ' + email);
    console.log('password: ' +password);*/
    const response = await axios.post(`${urlApi}/register`, {username, email, password});
    return response.data;
};
  
export const login = async (email, password) => {
   /* console.log('email: ' + email);
    console.log('password: ' +password);*/
    const response = await axios.post(`${urlApi}/login`, {email, password});
    return response.data;
};

export const logout = async () => {
    /*console.log('en logout');*/
    const response = await axios.get(`${urlApi}/logout`);
    return response.data;
};

