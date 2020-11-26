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
import AddPost from './components/AddPost';
import PostDetails from './components/PostDetails';
import Footer from './components/Footer';


import setAuthToken from './utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>

      <Router>

        <AppNavbar />

        <section className="container-lg">
          <Switch>
            <Route exact path="/zeneszkereso/login" component={Login} />
            <Route exact path="/zeneszkereso/dashboard" component={Dashboard} />
            <Route exact path="/zeneszkereso/register" component={Register} />
            <Route exact path="/zeneszkereso/post_details" component={PostDetails} />
            <PrivateRoute exact path="/zeneszkereso/add_post" component={AddPost} />
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
