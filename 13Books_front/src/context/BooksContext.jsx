import { createContext, useState, useContext, useEffect } from 'react';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [book, setBook] = useState([]);

  // compruebo si estoy logado en el localstorage y si es así relleno el setUser
  useEffect(() => {
    const loginLocalStorage = JSON.parse(localStorage.getItem('login'));
    if (loginLocalStorage !== null && loginLocalStorage.user !== null) {
      setUser(loginLocalStorage.user);      
    }
  }, []);

  return (
    <BooksContext.Provider value={{book, setBook, user, setUser }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => {
    return useContext(BooksContext);
}
