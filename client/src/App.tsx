import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

// After home, alphabetical order
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import CreateCluster from './pages/CreateCluster';
import CreateGoal from './pages/CreateGoal';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import SnailAdoption from './pages/SnailAdoption';
import ViewClusters from './pages/ViewClusters';
import { RequireAuth } from 'react-auth-kit';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element= {<Register />} />
        <Route
          path="home"
          element={
            <RequireAuth loginPath="/">
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="about"
          element={
            <RequireAuth loginPath="/">
              <About />
            </RequireAuth>
          }
        />
        <Route
          path="create-cluster"
          element={
            <RequireAuth loginPath="/">
              <CreateCluster />
            </RequireAuth>
          }
        />
        <Route
          path="create-goal"
          element={
            <RequireAuth loginPath="/">
              <CreateGoal />
            </RequireAuth>
          }
        />
        <Route
          path="snail-adoption"
          element={
            <RequireAuth loginPath="/">
              <SnailAdoption />
            </RequireAuth>
          }
        />
        <Route
          path="search-results"
          element={
            <RequireAuth loginPath="/">
              <SearchResults />
            </RequireAuth>
          }
        />
        <Route
          path="view-clusters"
          element={
            <RequireAuth loginPath="/">
              <ViewClusters />
            </RequireAuth>
          }
        />
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
