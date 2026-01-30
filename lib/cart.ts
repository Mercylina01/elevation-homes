// Cart utility functions for managing shopping cart state

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Get cart from localStorage
export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 };
  }

  const cart = localStorage.getItem('elevation-cart');
  return cart ? JSON.parse(cart) : { items: [], total: 0 };
}

// Save cart to localStorage
export function saveCart(cart: Cart): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('elevation-cart', JSON.stringify(cart));
  }
}

// Add item to cart
export function addToCart(
  product_id: string,
  name: string,
  price: number,
  quantity: number,
  image_url: string
): Cart {
  const cart = getCart();
  const existingItem = cart.items.find((item) => item.product_id === product_id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      id: `${product_id}-${Date.now()}`,
      product_id,
      name,
      price,
      quantity,
      image_url,
    });
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  saveCart(cart);
  return cart;
}

// Remove item from cart
export function removeFromCart(productId: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.product_id !== productId);
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  saveCart(cart);
  return cart;
}

// Update cart item quantity
export function updateCartQuantity(productId: string, quantity: number): Cart {
  const cart = getCart();
  const item = cart.items.find((item) => item.product_id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  saveCart(cart);
  return cart;
}

// Clear cart
export function clearCart(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('elevation-cart');
  }
}
