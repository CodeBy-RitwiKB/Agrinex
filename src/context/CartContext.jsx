import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('agrinex-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [shippingData, setShippingData] = useState(() => {
    const saved = localStorage.getItem('agrinex-shipping');
    const data = saved ? JSON.parse(saved) : { name: '', phone: '', countryCode: '+91', address1: '', address2: '', pincode: '' };
    // Always reset selections on mount to prevent accidental orders
    return { ...data, deliveryType: '', paymentType: '' };
  });

  useEffect(() => {
    localStorage.setItem('agrinex-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('agrinex-shipping', JSON.stringify(shippingData));
  }, [shippingData]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prev) => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) } : item
      )
    );
  };

  const updateShippingData = (newData) => {
    setShippingData(prev => ({ ...prev, ...newData }));
  };

  const resetCart = () => {
    setCart([]);
    setShippingData({ name: '', phone: '', countryCode: '+91', address1: '', address2: '', pincode: '', deliveryType: 'standard', paymentType: '' });
    localStorage.removeItem('agrinex-cart');
    localStorage.removeItem('agrinex-shipping');
  };

  const cartTotal = cart?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0;

  return (
    <CartContext.Provider value={{ 
      cart: cart || [], 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartTotal,
      shippingData,
      updateShippingData,
      resetCart
    }}>
      {children}
    </CartContext.Provider>
  );
};