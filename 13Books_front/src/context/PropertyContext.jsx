import { createContext, useState, useContext, useEffect } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [user, setUser] = useState({});

  // esto es para comprobar si estoy logado en el localstorage y si es así relleno el setUser
  useEffect(() => {
    const loginLocalStorage = JSON.parse(localStorage.getItem('login'));
    if (loginLocalStorage !== null && loginLocalStorage.user !== null) {
      setUser(loginLocalStorage.user);      
    }
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, setProperties, user, setUser }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
    return useContext(PropertyContext);
}