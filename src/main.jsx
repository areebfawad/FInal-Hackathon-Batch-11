// index.jsx or main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { AppProvider } from './context/AppContext';

// Find the root element in your HTML
const container = document.getElementById('root');

// Create a root instance using createRoot
const root = ReactDOM.createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
