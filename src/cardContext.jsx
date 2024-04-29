import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // เพิ่มสินค้าลงในตะกร้าหรืออัพเดทจำนวนหากมีอยู่แล้ว
      const existingIndex = state.findIndex(item => item.name === action.item.name);
      if (existingIndex >= 0) {
        const newState = [...state];
        // newState[existingIndex] = {
        //   ...state[existingIndex],
        //   quantity: newState[existingIndex].quantity + action.quantity
        // };
        newState[existingIndex].quantity += 1;
        return newState;
      } else {
        return [...state, { ...action.item, quantity: 1 }];

      }

    case 'REMOVE_ITEM':
      // ลบสินค้าจากตะกร้า
      return state.filter(item => item.name !== action.name);

    case 'UPDATE_QUANTITY':
      return state.map(item => {
        if (item.name === action.name) {
          return { ...item, quantity: action.quantity };
        }
        return item;
      });

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, [], () => {
    const localData = sessionStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(state));
    const newTotalPrice = state.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
    sessionStorage.setItem('totalPrice', JSON.stringify(newTotalPrice));
  }, [state]);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const removeItem = name => {
    dispatch({ type: 'REMOVE_ITEM', name });
    sessionStorage.removeItem('cart');
  };

  const updateQuantity = (name, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', name, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    sessionStorage.removeItem('cart');
  };

  // ส่งค่าที่ state และ function ที่ต้องการใช้งานให้กับ provider
  return (
    <CartContext.Provider value={{ items: state, addItem, removeItem, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);