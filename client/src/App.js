import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/authActions";

import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import './styles/autosuggest.css';

import PrivateRoute from './components/routing/PrivateRoute';
import AppNavbar from './components/AppNavbar';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddAd from './components/AddAd';
import AdDetails from './components/AdDetails';
import Footer from './components/Footer';


import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>

      <Router>

        <AppNavbar />

        <section className="container-fluid">
          <Switch>
            <Route exact path="/zeneszkereso/login" component={Login} />
            <Route exact path="/zeneszkereso/dashboard" component={Dashboard} />
            <Route exact path="/zeneszkereso/register" component={Register} />
            <Route exact path="/zeneszkereso/ad_details" component={AdDetails} />
            <PrivateRoute exact path="/zeneszkereso/add_ad" component={AddAd} />
            <Route path="/zeneszkereso/" component={Landing} />
            <Route render={() => <h1>404 Error - A lap nem található</h1>} />
          </Switch>
        </section>

        <Footer />

      </Router>
    </Provider>
  );
}

export default App;
