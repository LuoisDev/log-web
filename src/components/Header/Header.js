import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { PieChart, Pie, Cell } from 'recharts';

import {
  Navbar,
  Input,
  FormGroup,
  FormText,
  Col,
  Row, Label,Button
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";

import { closeSidebar, openSidebar } from "../../actions/navigation";



import s from "./Header.module.scss";
import "animate.css";
import Dot from "../Dot/Dot.js";
import { logoutUser } from "../../actions/auth.js";

const COLORS = ['#B8C3BF', '#008C4F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const Header = ({props}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const toggleSidebar = () => {
    if (props.sidebarOpened) {
      props.dispatch(closeSidebar());
    } else {
      const paths = props.location.pathname.split('/');
      paths.pop();
      props.dispatch(openSidebar());
    }
  }

  const doLogout = () => {
    props.dispatch(logoutUser());
  }
console.log('props', props);
  return (
    <Navbar style={{justifyContent: 'space-around'}}>

      <Widget className={s.widget_pie}>
        <Row style={{ height: 200, alignItems: 'center' }}>
          <Col >
            <PieChart width={200} height={200}>
              <Pie
                data={props}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {props.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Col>

          <Col>
          <FormText color="black" className="my-3">{`All: ${props[0].value+props[1].value} devices`}</FormText>

            {props.map((entry, index) => (
              <div className={s.label}>
                <Dot color={COLORS[index]} />
                <span className="body-3 ml-2">{entry.value +" "+ entry.name}</span>
              </div>
            ))}
          </Col>
        </Row>
      </Widget>
      <Widget className={s.widget_p}>
        <Row>
          <Col className="mb-4 mb-md-0" xs={12} md={4}>
            <FormGroup className="my-3">
              <FormText>Mac</FormText>
              <Input
                id="Mac"
                style={{ backgroundColor: '#D9D9D9' }}

                className="input-transparent pl-3"
                // value={state.email}
                // onChange={(event) => changeCreds(event)}
                type='search'
                required
                name="Mac"
                placeholder="Mac"
              />
            </FormGroup>
            <FormGroup className="my-3">
              <FormText>Version</FormText>
              <Input
                style={{ backgroundColor: '#D9D9D9' }}
                id="Version"
                className="input-transparent pl-3"
                // value={state.email}
                // onChange={(event) => changeCreds(event)}
                type='search'
                required
                name="Version"
                placeholder="Version"
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={4}>
            <FormGroup className="my-3">
              <FormText>Lrn</FormText>
              <Input
                id="Lrn"
                style={{ backgroundColor: '#D9D9D9' }}

                className="input-transparent pl-3"
                // value={state.email}
                // onChange={(event) => changeCreds(event)}
                type='search'
                required
                name="Lrn"
                placeholder="Lrn"
              />
            </FormGroup>
            <FormGroup className="my-3">
              <FormText>Home name</FormText>
              <Input
                id="Home name"
                style={{ backgroundColor: '#D9D9D9' }}

                className="input-transparent pl-3"
                // value={state.email}
                // onChange={(event) => changeCreds(event)}
                type='search'
                required
                name="Home name"
                placeholder="Home name"
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={4}>
            <FormText className="my-3">Home name</FormText>
            <FormGroup
              check
              inline
            >
              <Input type="checkbox" />
              <Label check>
              All
              </Label>
            </FormGroup>
            <FormGroup
              check
              inline
            >
              <Input type="checkbox" />
              <Label check>
              Offline
              </Label>
            </FormGroup>
            <FormGroup
              check
              inline
            >
              <Input type="checkbox" />
              <Label check>
              Online
              </Label>
            </FormGroup>
            <FormText className="my-3">Type</FormText>
            <FormGroup
              check
              inline
            >
              <Input type="checkbox" />
              <Label check>
              All
              </Label>
            </FormGroup>
            <FormGroup
              check
              inline
            >
              <Input type="checkbox" />
              <Label check>
              Master
              </Label>
            </FormGroup>
            <FormGroup
              check
              inline
            >
              <Input type="checkbox" />
              <Label check>
              Slave
              </Label>
            </FormGroup>
          </Col>
          <div className={s.button_submit}>
            <Button color="success">Search</Button>
          </div>
        </Row>
      </Widget>

    </Navbar>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Header));

