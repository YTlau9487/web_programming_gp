import { writable } from 'svelte/store';

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
  const { subscribe, update } = writable<CartItem[]>([]);

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
            ? { ...i, quantity: Math.max(1, i.quantity + delta) } // 不低於 1
            : i
        )
      );
    }
  };
}


export const cart = createCartStore();
