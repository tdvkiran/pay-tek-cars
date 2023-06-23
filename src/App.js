import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import AllCars from './components/AllCars/AllCars';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';
import './index.css';
import { CartProvider } from './context/cartContext';
import Homepage from './components/Homepage/Homepage';
const history = createBrowserHistory();
function App() {
  return (
    <CartProvider>
    <Navbar history={history} />
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => <Homepage history={history} />} />
        <Route path="/cars" component={AllCars} />
        <Route path="/cart" component={() => <Cart history={history} />} />
      </Switch>
    </Router>
  </CartProvider>
  );
}

export default App;
