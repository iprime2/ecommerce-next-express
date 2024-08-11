import { create } from 'zustand';

interface CartProduct {
  id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  getCartData: () => CartProduct[];
  getTotalCount: () => number;
  loadCartFromStorage: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  products: [],

  addProduct: (product: CartProduct) => {
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);

      let updatedProducts;
      if (existingProduct) {
        updatedProducts = state.products.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      } else {
        updatedProducts = [...state.products, product];
      }

      // Save to localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
      }

      return {
        products: updatedProducts,
      };
    });
  },

  removeProduct: (productId: string) => {
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== productId);

      // Save to localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
      }

      return {
        products: updatedProducts,
      };
    });
  },

  clearCart: () => {
    // Clear local storage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    set({ products: [] });
  },

  getCartData: () => {
    return get().products;
  },

  getTotalCount: () => {
    return get().products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  },

  loadCartFromStorage: () => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        set({ products: JSON.parse(storedCart) });
      }
    }
  },
}));

// Make sure to call this function on the client side
if (typeof window !== 'undefined') {
  useCartStore.getState().loadCartFromStorage();
}
