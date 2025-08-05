import { createSlice } from '@reduxjs/toolkit';
import { saveCartToStorage, clearCartFromStorage } from '../../utils/cartPersistence.js';

const initialState = {
  items: [], // Array of cart items { id, name, price, image, quantity, inStock }
  total: 0,
  itemCount: 0,
  isOpen: false // For cart drawer/modal
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity: 1,
          inStock: product.inStock,
          category: product.category
        });
      }

      cartSlice.caseReducers.calculateTotals(state);
      saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      cartSlice.caseReducers.calculateTotals(state);
      saveCartToStorage(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      cartSlice.caseReducers.calculateTotals(state);
      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      clearCartFromStorage();
    },

    toggleCartDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },

    setCartDrawer: (state, action) => {
      state.isOpen = action.payload;
    },

    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Load cart from localStorage
    loadCartFromStorage: (state, action) => {
      const savedCart = action.payload;
      if (savedCart && savedCart.items) {
        state.items = savedCart.items;
        cartSlice.caseReducers.calculateTotals(state);
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCartDrawer,
  setCartDrawer,
  calculateTotals,
  loadCartFromStorage
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartDrawerOpen = (state) => state.cart.isOpen;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find(item => item.id === id);

export default cartSlice.reducer;