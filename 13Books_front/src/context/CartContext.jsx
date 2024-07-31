import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);
   
    const addToShoppingCart = (book) => {
        const currentCart = [...shoppingCart];

        // compruebo si el libro está o no el carrito para la cantidad en el pedido
        const bookExists = currentCart.findIndex((cartBook) => cartBook.bookid === book.bookid);
        if (bookExists >= 0) {
            currentCart[bookExists].amount += 1;
            setShoppingCart(currentCart);
        } else {
            setShoppingCart([...currentCart, { ...book, amount: 1 }]);
        }
    };

    const removeFromShoppingCart = (bookid) => {
        const currentCart = [...shoppingCart];
        const bookExists = currentCart.findIndex((cartBook) => cartBook.bookid === bookid);
        if (bookExists >= 0) {
            if (currentCart[bookExists].amount > 1) {
                currentCart[bookExists].amount -= 1;
            } else {
                currentCart.splice(bookExists, 1);
            }
        }
        setShoppingCart(currentCart);
    };

    const totalBooks = shoppingCart.reduce((acc, book) => acc + book.amount, 0);

    return (
        <CartContext.Provider value={{shoppingCart, addToShoppingCart, removeFromShoppingCart, totalBooks, setShoppingCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
}
