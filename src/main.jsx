import { jsxDEV } from 'react/jsx-dev-runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');

// Check if createRoot is available (React 17 and later)
if (ReactDOM.createRoot) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // If createRoot is not available (React 16), fall back to render
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );
}
