// -- React and related libs
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";

// -- Redux
import { connect } from "react-redux";

// -- Custom Components
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";

// -- Redux Actions
import { logoutUser } from "./actions/auth";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Services
import isAuthenticated from "./services/authService";

// -- Component Styles
import "./styles/app.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Detail from "./pages/detail/Detail";
import LayoutDetail from "./components/LayoutDetail/LayoutDetail";

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))) {
    console.log("Not authenticated");
    dispatch(logoutUser());
    return (<Redirect to="/login" />)
  } else {
    console.log("Authenticated");
    return (
      <Route { ...rest } render={props => (React.createElement(component, props))} />
    );
  }
};

const App = (props) => {
  return (
    <div>
      <ToastContainer/>
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
          <PrivateRoute path="/dashboard" dispatch={props.dispatch} component={Layout} />
          <PrivateRoute path="/detail" dispatch={props.dispatch} component={LayoutDetail} />
          <Route path="/login"  component={Login} />
          <Route path="/error" exact component={ErrorPage} />
          <Route component={ErrorPage}/>
          <Route path='*' exact={true} render={() => <Redirect to="/error" />} />
        </Switch>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
