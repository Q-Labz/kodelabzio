import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LeadModalProvider } from './contexts/LeadModalContext';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <LeadModalProvider>
      <App />
    </LeadModalProvider>
  </StrictMode>
);