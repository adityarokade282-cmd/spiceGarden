import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2, User, Phone, MapPin } from 'lucide-react';
import type { CartItem } from '@/types';

interface CartProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
}

interface CheckoutErrors {
  [key: string]: string;
}

type CartView = 'cart' | 'checkout' | 'confirmation';

export default function Cart({
  open,
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: CartProps) {
  const [view, setView] = useState<CartView>('cart');
  const [form, setForm] = useState<CheckoutForm>({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [orderDetails, setOrderDetails] = useState<{ name: string; total: number; items: number } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 40 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const validate = (): boolean => {
    const e: CheckoutErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setOrderDetails({ name: form.name, total, items: totalItems });
      setView('confirmation');
      onClear();
    }
  };

  const handleClose = () => {
    onClose();
    // Reset to cart view after close animation
    setTimeout(() => {
      setView('cart');
      setForm({ name: '', phone: '', address: '' });
      setErrors({});
    }, 300);
  };

  const handleField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[55] bg-charcoal-950/70 backdrop-blur-sm animate-fade-in"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[56] w-full sm:w-[440px] bg-charcoal-900 shadow-card flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-cream-100/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-saffron-400" />
            <h3 className="text-lg font-bold text-cream-100">
              {view === 'cart' && `Your Cart (${totalItems})`}
              {view === 'checkout' && 'Checkout'}
              {view === 'confirmation' && 'Order Confirmed'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg glass-light hover:bg-cream-100/10 transition-all"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-cream-100" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Cart view */}
          {view === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-charcoal-800 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-cream-100/30" />
                  </div>
                  <h4 className="text-lg font-bold text-cream-100 mb-2">Your cart is empty</h4>
                  <p className="text-sm text-cream-100/50 mb-6">
                    Add some delicious dishes from our menu to get started!
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold hover:scale-105 transition-all"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-xl bg-charcoal-800 border border-cream-100/5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-cream-100 line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-cream-100/40 hover:text-crimson-400 transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-sm text-saffron-400 font-semibold">
                          &#8377;{item.price}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-1 bg-charcoal-900 rounded-lg p-1">
                            <button
                              onClick={() => onDecrease(item.id)}
                              className="w-7 h-7 rounded-md hover:bg-cream-100/10 flex items-center justify-center transition-all"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5 text-cream-100" />
                            </button>
                            <span className="text-sm font-bold text-cream-100 w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onIncrease(item.id)}
                              className="w-7 h-7 rounded-md hover:bg-cream-100/10 flex items-center justify-center transition-all"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5 text-cream-100" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-cream-100">
                            &#8377;{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Checkout view */}
          {view === 'checkout' && (
            <form onSubmit={handleCheckout} className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-saffron-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-800 border border-cream-100/10 text-cream-100 text-sm placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-crimson-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-saffron-400" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-800 border border-cream-100/10 text-cream-100 text-sm placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-xs text-crimson-400 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-saffron-400" /> Delivery Address
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleField('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-800 border border-cream-100/10 text-cream-100 text-sm placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none transition-all resize-none"
                  placeholder="Flat / House no, Street, Area, City, PIN code"
                />
                {errors.address && <p className="text-xs text-crimson-400 mt-1">{errors.address}</p>}
              </div>

              {/* Order summary */}
              <div className="p-4 rounded-xl bg-charcoal-800 border border-cream-100/5">
                <h4 className="text-sm font-bold text-cream-100 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-cream-100/60">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>&#8377;{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-cream-100/60">
                    <span>Delivery Fee</span>
                    <span>&#8377;{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-cream-100/60">
                    <span>Taxes (5%)</span>
                    <span>&#8377;{tax}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-cream-100 pt-2 border-t border-cream-100/10">
                    <span>Total</span>
                    <span className="text-saffron-400">&#8377;{total}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setView('cart')}
                  className="flex-1 px-4 py-3 rounded-xl glass-light text-cream-100 font-medium hover:bg-cream-100/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold shadow-glow-saffron hover:scale-[1.02] transition-all"
                >
                  Place Order
                </button>
              </div>
              <p className="text-xs text-cream-100/40 text-center">
                This is a demo checkout. No actual order will be placed.
              </p>
            </form>
          )}

          {/* Confirmation view */}
          {view === 'confirmation' && orderDetails && (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mb-5 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cream-100 mb-3">Order Placed!</h3>
              <p className="text-sm text-cream-100/70 mb-2">
                Thank you, {orderDetails.name}. Your order of {orderDetails.items} items
                totalling &#8377;{orderDetails.total} has been received.
              </p>
              <p className="text-xs text-cream-100/50 mb-6">
                This is a demo confirmation. In a real app, your order would be sent to the
                restaurant for preparation.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold hover:scale-105 transition-all"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>

        {/* Footer with totals + checkout button (cart view only) */}
        {view === 'cart' && items.length > 0 && (
          <div className="p-5 border-t border-cream-100/10 flex-shrink-0 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-cream-100/60">
                <span>Subtotal</span>
                <span>&#8377;{subtotal}</span>
              </div>
              <div className="flex justify-between text-cream-100/60">
                <span>Delivery Fee</span>
                <span>&#8377;{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-cream-100/60">
                <span>Taxes (5%)</span>
                <span>&#8377;{tax}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-cream-100 pt-2 border-t border-cream-100/10">
                <span>Total</span>
                <span className="text-saffron-400">&#8377;{total}</span>
              </div>
            </div>
            <button
              onClick={() => setView('checkout')}
              className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold shadow-glow-saffron hover:scale-[1.02] transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
