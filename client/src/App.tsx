import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

// After home, alphabetical order
import Home from './pages/Home';
import About from './pages/About';
import CreateCluster from './pages/CreateCluster';
import CreateGoal from './pages/CreateGoal';
import SearchResults from './pages/SearchResults';
import SnailAdoption from './pages/SnailAdoption';
import ViewClusters from './pages/ViewClusters';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="create-cluster" element={<CreateCluster />} />
        <Route path="create-goal" element={<CreateGoal />} />
        <Route path="snail-adoption" element={<SnailAdoption />} />
        <Route path="search-results" element={<SearchResults />} />
        <Route path="view-clusters" element={<ViewClusters />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
