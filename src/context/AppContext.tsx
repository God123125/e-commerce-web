import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, PromoCode, Review, OrderItem } from '../types';
import { MOCK_PRODUCTS, MOCK_REVIEWS_MAP, MOCK_PROMO_CODES } from '../data/products';

export type PageType = 'home' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'account' | 'contact';

interface AppContextType {
  currentPage: PageType;
  selectedProductId: string | null;
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  user: UserProfile | null;
  orders: Order[];
  appliedPromo: PromoCode | null;
  isDarkMode: boolean;
  reviews: Record<string, Review[]>;
  searchQuery: string;
  categoryFilter: string;
  priceRange: [number, number];
  sortBy: string;
  setPage: (page: PageType, productId?: string | null) => void;
  addToCart: (product: Product, quantity: number, color: string, size?: string) => void;
  removeFromCart: (productId: string, color: string, size?: string) => void;
  updateCartQuantity: (productId: string, color: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  toggleDarkMode: () => void;
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;
  updateUserProfile: (profile: UserProfile) => void;
  placeOrder: (shipping: UserProfile, method: string) => Order | null;
  addReview: (productId: string, rating: number, comment: string) => void;
  setFilters: (search: string, category: string, price: [number, number], sort: string) => void;
  resetFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  name: "Victoria Sterling",
  email: "Srunkerry@gmail.com",
  phone: "+1 (555) 732-8411",
  address: "742 Avenue de l'Opéra",
  city: "Paris",
  zipCode: "75001"
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page Routing & Navigation
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart, Wishlist, Order History
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem('ah_cart');
    return cached ? JSON.parse(cached) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const cached = localStorage.getItem('ah_wishlist');
    return cached ? JSON.parse(cached) : [];
  });
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const cached = localStorage.getItem('ah_recently_viewed');
    return cached ? JSON.parse(cached) : [];
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    const cached = localStorage.getItem('ah_user');
    return cached ? JSON.parse(cached) : DEFAULT_PROFILE;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const cached = localStorage.getItem('ah_orders');
    if (cached) return JSON.parse(cached);
    
    // Seed one starter mock order so history isn't empty initially
    const starterOrder: Order = {
      id: 'ORD-9841',
      date: '2026-06-10',
      status: 'Delivered',
      items: [
        {
          productId: 'wa1',
          productName: 'Saffiano Gold Slim Cardholder',
          image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop',
          price: 79,
          quantity: 1,
          color: 'Onyx Black'
        }
      ],
      totalAmount: 79,
      shippingAddress: '742 Avenue de l\'Opéra, Paris, 75001',
      paymentMethod: 'Apple Pay'
    };
    return [starterOrder];
  });

  // Promo Codes, Dark Mode, Reviews
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cached = localStorage.getItem('ah_dark_mode');
    return cached === 'true';
  });
  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const cached = localStorage.getItem('ah_reviews');
    return cached ? JSON.parse(cached) : MOCK_REVIEWS_MAP;
  });

  // Global Filter State (transient for Shop)
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('popular');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ah_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ah_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ah_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('ah_user', user ? JSON.stringify(user) : '');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ah_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ah_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ah_dark_mode', String(isDarkMode));
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Actions
  const setPage = (page: PageType, productId: string | null = null) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
      addRecentlyViewed(productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page !== 'product-details') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addToCart = (product: Product, quantity: number, color: string, size?: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });
  };

  const removeFromCart = (productId: string, color: string, size?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
    ));
  };

  const updateCartQuantity = (productId: string, color: string, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 6); // Max 6 items
    });
  };

  const applyPromo = (code: string) => {
    const codeUpper = code.trim().toUpperCase();
    const match = MOCK_PROMO_CODES.find(p => p.code === codeUpper);
    if (match) {
      setAppliedPromo(match);
      return { success: true, message: `Promo code ${match.code} applied successfully!` };
    }
    return { success: false, message: 'Invalid promo code. Please try again.' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const loginUser = (email: string, name: string) => {
    setUser({
      name,
      email,
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    });
  };

  const logoutUser = () => {
    setUser(null);
    setOrders([]);
  };

  const updateUserProfile = (profile: UserProfile) => {
    setUser(profile);
  };

  const placeOrder = (shipping: UserProfile, method: string) => {
    if (cart.length === 0) return null;

    // Calculate details
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingCost = subtotal > 150 ? 0 : 15;
    let discount = 0;
    if (appliedPromo) {
      if (appliedPromo.discountType === 'percentage') {
        discount = subtotal * (appliedPromo.value / 100);
      } else {
        discount = appliedPromo.value;
      }
    }
    const finalAmount = Math.max(0, subtotal - discount + shippingCost);

    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      image: item.product.images[0],
      price: item.product.price,
      quantity: item.quantity,
      color: item.selectedColor,
      size: item.selectedSize
    }));

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      items: orderItems,
      totalAmount: Number(finalAmount.toFixed(2)),
      shippingAddress: `${shipping.address}, ${shipping.city}, ${shipping.zipCode}`,
      paymentMethod: method,
      trackingNumber: `AH-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setPage('account');
    return newOrder;
  };

  const addReview = (productId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: user ? user.name : 'Anonymous Lover',
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      verified: true
    };

    setReviews(prev => {
      const prodReviews = prev[productId] || [];
      return {
        ...prev,
        [productId]: [newReview, ...prodReviews]
      };
    });
  };

  const setFilters = (search: string, category: string, price: [number, number], sort: string) => {
    setSearchQuery(search);
    setCategoryFilter(category);
    setPriceRange(price);
    setSortBy(sort);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setPriceRange([0, 500]);
    setSortBy('popular');
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      selectedProductId,
      cart,
      wishlist,
      recentlyViewed,
      user,
      orders,
      appliedPromo,
      isDarkMode,
      reviews,
      searchQuery,
      categoryFilter,
      priceRange,
      sortBy,
      setPage,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      addRecentlyViewed,
      applyPromo,
      removePromo,
      toggleDarkMode,
      loginUser,
      logoutUser,
      updateUserProfile,
      placeOrder,
      addReview,
      setFilters,
      resetFilters
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
