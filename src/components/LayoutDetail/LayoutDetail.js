// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";
import Dashboard from "../../pages/dashboard/Dashboard";


// -- Component Styles
import s from "./Layout.module.scss";
import Detail from "../../pages/detail/Detail";
import SidebarDetail from "../Sidebar/SidebarDetail";

const LayoutDetail = (props) => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        {/* <Header /> */}
        <SidebarDetail />
        <main className={s.content}>
          <Breadcrumbs url={props.location.pathname} />
          <Switch>
            <Route path="/detail" exact component={Detail}/>
            <Route path='*' exact render={() => <Redirect to="/error" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

LayoutDetail.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(LayoutDetail));
