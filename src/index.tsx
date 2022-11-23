import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ExamplePage from './pages/ExamplePage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ExamplePage />
  </React.StrictMode>
);

// If you want to start measuring performance in your ExamplePage, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
