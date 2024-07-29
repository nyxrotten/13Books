import { createContext, useState, useContext, useEffect } from 'react';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({});

  // compruebo si estoy logado en el localstorage y si es así relleno el setUser
  useEffect(() => {
    const loginLocalStorage = JSON.parse(localStorage.getItem('login'));
    if (loginLocalStorage !== null && loginLocalStorage.user !== null) {
      setUser(loginLocalStorage.user);      
    }
  }, []);

  return (
    <BooksContext.Provider value={{books, setBooks, user, setUser, searchCriteria, setSearchCriteria }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => {
    return useContext(BooksContext);
}
