import React from "react";
import Products from './components/Products/Products'
import Login from './components/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GuardedRoute from './utils/guardedRoute';
import { initAuth } from "./components/store/actions";
import { useSelector, useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  dispatch(initAuth());

  const loggedIn = useSelector((state) => state.loggedIn);

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <GuardedRoute path="/home" exact auth={loggedIn} component={Products} />
          <GuardedRoute
            path="/products"
            exact
            auth={loggedIn}
            component={Products}
          />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
