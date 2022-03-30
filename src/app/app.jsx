import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQualities';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <QualitiesProvider>
          <ProfessionProvider>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
          </ProfessionProvider>
        </QualitiesProvider>
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </Router>
  );
}
