import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import { useScrollToTop } from './hooks/useScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

const ScrollToTop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useScrollToTop();
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-screen text-white relative flex flex-col"
            >
              <Navbar />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
            </motion.div>
          </ScrollToTop>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;