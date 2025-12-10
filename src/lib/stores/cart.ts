// src/lib/stores/cart.ts
import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export type ProductData = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  rating: number;
  stock: number;
  brand?: string;
};

export type CartItem = ProductData & { quantity: number };

function createCartStore() {
  // 1) initial value: try to load from localStorage on client
  let initial: CartItem[] = [];

  if (browser) {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        initial = JSON.parse(stored) as CartItem[];
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }

  const store: Writable<CartItem[]> = writable<CartItem[]>(initial);
  const { subscribe, update, set } = store;

  // 2) persist to localStorage whenever cart changes (client-side only)
  if (browser) {
    store.subscribe((items) => {
      try {
        localStorage.setItem('cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    });
  }

  return {
    subscribe,
    add(product: ProductData) {
      update((items) => {
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          return items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...items, { ...product, quantity: 1 }];
      });
    },
    remove(id: number) {
      update((items) => items.filter((i) => i.id !== id));
    },
    changeQuantity(id: number, delta: number) {
      update((items) =>
        items.map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(1, i.quantity + delta) }
            : i
        )
      );
    },
    clear() {
      set([]);
    }
  };
}

export const cart = createCartStore();
