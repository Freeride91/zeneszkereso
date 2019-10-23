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

import AppNavbar from './components/AppNavbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import NewAd from './components/NewAd';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>

      <Router>

        <AppNavbar />

        <section className="container-fluid controlMaxWidth">
          <Switch>
            <Route exact path="/ads" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/new_ad" component={NewAd} />
            <Route render={() => <h1>404 Error</h1>} />
          </Switch>
        </section>

        <Footer />

      </Router>
    </Provider>
  );
}

export default App;
