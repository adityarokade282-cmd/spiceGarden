import { useState, useCallback } from 'react';
import type { MenuItem, CartItem } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Specialties from '@/components/Specialties';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Reservations from '@/components/Reservations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const increaseQty = useCallback((id: string) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c))
    );
  }, []);

  const decreaseQty = useCallback((id: string) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-charcoal-950 text-cream-100">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Menu onAddToCart={addToCart} />
        <Specialties onAddToCart={addToCart} />
        <Gallery />
        <Reviews />
        <Reservations />
        <Contact />
      </main>
      <Footer />
      <Cart
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onClear={clearCart}
      />
    </div>
  );
}
