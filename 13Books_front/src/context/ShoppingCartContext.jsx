import { createContext, useState, useContext, useEffect } from 'react';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);

    const addToShoppingCart = (book) => {
        setShoppingCart((myCart) => [...myCart, book]);
    };

    const removeFromShoppingCart = (bookid) => {
        setShoppingCart((myCart) => myCart.filter(book => book.bookid !== bookid));
    };

    return (
        <ShoppingCartContext.Provider value={{ shoppingCart, addToShoppingCart, removeFromShoppingCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export const useShoppingCartContext = () => {
    return useContext(ShoppingCartContext);
}
