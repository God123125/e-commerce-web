import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { Contact } from './pages/Contact';

const PageRenderer: React.FC = () => {
  const { currentPage } = useApp();

  const renderActive = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product-details':
        return <ProductDetails />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'account':
        return <Account />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="flex-grow transition-opacity duration-500 ease-in-out" id="active-page-viewport">
      {renderActive()}
    </main>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300" id="application-container">
      {/* Dynamic top message/navigation */}
      <Navbar />
      
      {/* Active viewport */}
      <PageRenderer />

      {/* Footer block */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
