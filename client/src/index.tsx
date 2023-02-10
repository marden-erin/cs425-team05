import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

// After home, alphabetical order
import Home from './pages/Home';
import About from './pages/About';
import CreateCluster from './pages/CreateCluster';
import SearchResults from './pages/SearchResults';
import SnailAdoption from './pages/SnailAdoption';
import ViewClusters from './pages/ViewClusters';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/create-cluster" element={<CreateCluster />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/snail-selection" element={<SnailAdoption />} />
      <Route path="/view-clusters" element={<ViewClusters />} />
    </Routes>
  </BrowserRouter>
);
