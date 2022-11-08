import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import Fetch from './pages/Fetch';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
