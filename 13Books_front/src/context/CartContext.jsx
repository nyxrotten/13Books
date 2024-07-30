import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
//   const [searchCriteria, setSearchCriteria] = useState({});

  // compruebo si estoy logado en el localstorage y si es así relleno el setUser
    useEffect(() => {
        const loginLocalStorage = JSON.parse(localStorage.getItem('login'));
        if (loginLocalStorage !== null && loginLocalStorage.user !== null) {
        setUser(loginLocalStorage.user);
    }
    }, []);

return (
    <CartContext.Provider value={{cart, setCart, user, setUser }}>
        {children}
    </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
}
