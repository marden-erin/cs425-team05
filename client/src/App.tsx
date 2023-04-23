import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

// After home, alphabetical order
import About from './pages/About';
import AllSnails from './pages/AllSnails';
import BurySnail from './pages/BurySnail';
import CreateGoal from './pages/CreateGoal';
import FailedGoal from './pages/FailedGoal';
import GraveAdoption from './pages/GraveAdoption';
import Graveyard from './pages/Graveyard';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import CustomizeSnail from './pages/CustomizeSnail';
import SnailAdoption from './pages/SnailAdoption';
import UpdateGoal from './pages/UpdateGoal';
import ViewGoals from './pages/ViewGoals';
import ViewClusters from './pages/ViewClusters';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
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
          path="all-snails"
          element={
            <RequireAuth loginPath="/">
              <AllSnails />
            </RequireAuth>
          }
        />
        <Route
          path="bury-snail"
          element={
            <RequireAuth loginPath="/">
              <BurySnail />
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
          path="failed-goal"
          element={
            <RequireAuth loginPath="/">
              <FailedGoal />
            </RequireAuth>
          }
        />
        <Route
          path="profile-page"
          element={
            <RequireAuth loginPath="/">
              <ProfilePage />
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
          path="customize-snail"
          element={
            <RequireAuth loginPath="/">
              <CustomizeSnail />
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
          path="update-goal"
          element={
            <RequireAuth loginPath="/">
              <UpdateGoal />
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
        <Route
          path="view-goals"
          element={
            <RequireAuth loginPath="/">
              <ViewGoals />
            </RequireAuth>
          }
        />
        <Route
          path="grave-adoption"
          element={
            <RequireAuth loginPath="/">
              <GraveAdoption />
            </RequireAuth>
          }
        />
        <Route
          path="graveyard"
          element={
            <RequireAuth loginPath="/">
              <Graveyard />
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
