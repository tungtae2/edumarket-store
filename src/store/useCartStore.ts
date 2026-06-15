import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Prevent duplicate items
        if (state.items.find((i) => i.id === item.id)) {
          return state;
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      clearCart: () => set({ items: [] }),
      totalAmount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price, 0);
      },
    }),
    {
      name: 'worksheet-cart', // name of the item in the storage (must be unique)
    }
  )
);
