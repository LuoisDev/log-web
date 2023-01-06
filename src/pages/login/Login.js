import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import { loginUser } from "../../actions/auth";
import hasToken from "../../services/authService";
import s from "./Login.module.scss";
import axios from 'axios';

import SofiaLogo from "../../components/Icons/SofiaLogo.js";

import logoLumi from "../../assets/Group.svg";
import { BASE_URL } from "../../const/url";
const Login = (props) => {
  const history = useHistory();

  const [state, setState] = useState({
    email: 'monitoring',
    password: 'lumivn274',
  })

  const doLogin = async (e) => {
    e.preventDefault();
    const login_url= BASE_URL+ '/hc-monitoring/user-login';
    const data = {
      username: state.email,
      password: state.password
    }
    try {
      const res = await axios.post(login_url, data, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      });
      console.log('res=========', res.data.data.access_token);
      if (res.data.success) {
        console.log('a');
        props.dispatch(loginUser({ access_token: res.data.data.access_token }))
        history.push(`/dashboard`);

      }

    } catch (err) {
      console.log('abc', err.response.data.error)

    }
  }

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const { from } = props.location.state || { from: { pathname: '/dashboard' } };
  if (hasToken(JSON.parse(localStorage.getItem('access_token')))) {
    console.log('avc');
    return (
      <Redirect to={from} />
    )
  }

  return (
    <div className={s.pageContainer}>
      <Widget className="widget-auth widget-p-lg">
        <div className="d-flex align-items-center justify-content-between py-3">
          <p className="auth-header mb-0">Login</p>
          <div className="logo-block">
            {/* <SofiaLogo /> */}
            <img src={logoLumi} alt="User" />
          </div>
        </div>

        <form onSubmit={(event) => doLogin(event)}>
          <FormGroup className="my-3">
            <FormText>Email</FormText>
            <Input
              id="email"
              className="input-transparent pl-3"
              value={state.email}
              onChange={(event) => changeCreds(event)}
              required
              name="email"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup className="my-3">
            <div className="d-flex justify-content-between">
              <FormText>Password</FormText>
            </div>
            <Input
              id="password"
              className="input-transparent pl-3"
              value={state.password}
              onChange={(event) => changeCreds(event)}
              type="password"
              required
              name="password"
              placeholder="Password"
            />
          </FormGroup>
          <div className="bg-widget d-flex justify-content-center">
            <Button color="success">Login</Button>
          </div>

        </form>
      </Widget>
      <Footer />
    </div>
  )
}


Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
