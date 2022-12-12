import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import CreateCluster from './pages/CreateCluster';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CreateCluster />
    
  </React.StrictMode>
);


