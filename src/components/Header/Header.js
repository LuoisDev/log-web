import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormText,
  Col,
  Row,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";

import { logoutUser } from "../../actions/auth";
import { closeSidebar, openSidebar } from "../../actions/navigation";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon";
import SearchBarIcon from "../Icons/HeaderIcons/SearchBarIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon";
import MessagesIcon from "../../assets/navbarMenus/pfofileIcons/MessagesIcon";
import TasksIcon from "../../assets/navbarMenus/pfofileIcons/TasksIcon";

import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import basketIcon from "../../assets/navbarMenus/basketIcon.svg";
import calendarIcon from "../../assets/navbarMenus/calendarIcon.svg";
import envelopeIcon from "../../assets/navbarMenus/envelopeIcon.svg";
import mariaImage from "../../assets/navbarMenus/mariaImage.jpg";
import notificationImage from "../../assets/navbarMenus/notificationImage.jpg";
import userImg from "../../assets/user.svg";

import s from "./Header.module.scss";
import "animate.css";
import Dot from "../Dot/Dot.js";
const data = [
  { name: 'Online', value: 400 },
  { name: 'Offline', value: 1200 },

];

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
const Header = (props) => {
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

  return (
    <Navbar className={`${s.root} d-print-none`}>
      <div>
        <NavLink
          onClick={() => toggleSidebar()}
          className={`d-md-none mr-3 ${s.navItem}`}
          href="#"
        >
          <MenuIcon className={s.menuIcon} />
        </NavLink>
      </div>
      <Widget className={s.widget_pie}>
        <Row style={{height: 200,alignItems:'center'}}>
          <Col >

            <PieChart width={200} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
          </Col>

          <Col>
            {data.map((entry, index) => (
              <div className={s.label}>
                <Dot color={COLORS[index]} />
                <span className="body-3 ml-2">{entry.name}</span>
              </div>
            ))}
          </Col>
        </Row>
      </Widget>
      <Widget className={s.widget_p}>
        <Row className="gutter mb-4">
          <Col className="mb-4 mb-md-0" xs={12} md={6}>
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
          <Col xs={12} md={6}>
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
          {/* <Col xs={12} md={6}>
          <div
              className="checkbox checkbox-primary mr-1">
              <input
                // onChange={() => props.toggleTask(task.id)}
                // checked={task.completed}
                className="styled"
                id={`checkbox`}
                type="checkbox"
              />
              <label className="form-check-label" 
              // htmlFor={`checkbox${task.id}`}
               />
            </div>
          </Col> */}

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

