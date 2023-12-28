import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};