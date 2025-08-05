// Cart persistence utilities for localStorage
const CART_STORAGE_KEY = 'algeria_ecommerce_cart';

export const saveCartToStorage = (cartState) => {
  try {
    const cartData = {
      items: cartState.items,
      total: cartState.total,
      itemCount: cartState.itemCount,
      timestamp: Date.now()
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      
      // Check if cart data is less than 7 days old
      const isExpired = Date.now() - cartData.timestamp > 7 * 24 * 60 * 60 * 1000;
      
      if (isExpired) {
        localStorage.removeItem(CART_STORAGE_KEY);
        return null;
      }
      
      return cartData;
    }
    return null;
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    localStorage.removeItem(CART_STORAGE_KEY);
    return null;
  }
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
};

// Listen for storage changes in other tabs
export const setupCartStorageListener = (dispatch, loadCartFromStorageAction) => {
  const handleStorageChange = (event) => {
    if (event.key === CART_STORAGE_KEY && event.newValue) {
      try {
        const cartData = JSON.parse(event.newValue);
        dispatch(loadCartFromStorageAction(cartData));
      } catch (error) {
        console.error('Failed to sync cart from storage:', error);
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};
