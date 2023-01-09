import React, { useState, useEffect ,useRef} from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Col,
    Row,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Badge, Button, Input,
    FormGroup,
    FormText, Navbar, Label
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from "prop-types";
import { connect } from "react-redux";


import s from "./Tables.module.scss";
import data from "./data.json";
import { base_color, inactive_color } from "../../const/index.js";
import Header from "../../components/Header/Header.js";
import { Link, Redirect, useHistory } from "react-router-dom";
import { BASE_URL } from "../../const/url.js";
import axios from 'axios';
import { logoutUser } from "../../actions/auth.js";
import Dot from "../../components/Dot/Dot.js";
const COLORS = [ '#008C4F' ,'#B8C3BF'];

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
const Dashboard = function (props) {
    const history = useHistory();
    const [secondTable, setDataHc] = useState([]);
    const [status, setStatus] = useState(2);
    const [type, setType] = useState(2);
    const [mac, setMac] = useState('');
    const [version, setVersion] = useState('');
    const [lrn, setLrn] = useState('');
    const [page, setPage] = useState(1);
    let config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }

    const doGetChart = async (e) => {
        const url = BASE_URL + '/hc-monitoring/summary';

        try {
            const res = await axios.get(url, config);
            console.log('res=========', res.data);
            if (res.data.success) {
                console.log('a');
                let final = []
                final.push({ name: 'Online', value: res.data.data.online })
                final.push({ name: 'Offline', value: res.data.data.offline })
                setDataChart(final)
                console.log(final);
            }
            else {
                localStorage.removeItem('access_token');
                return (<Redirect to="/login" />)
            }

        } catch (err) {
            console.log('abc', err)

        }
    }
    const changeStringCase = () => {
        if (type === 2 && status === 2) {
            console.log('type 2 status 2');
            return `${BASE_URL}/hc-monitoring/list?page=${page}&mac=${mac}&version=${version}&lrn=${lrn}`;
        }
        else if (type === 2 && status !== 2) {
            console.log('type 2 status !2');
            return `${BASE_URL}/hc-monitoring/list?page=${page}&is_connect=${status}&mac=${mac}&version=${version}&lrn=${lrn}`;
        }
        else if (type !== 2 && status === 2) {
            console.log('type !2 status 2');
            return `${BASE_URL}/hc-monitoring/list?page=${page}&is_master=${type}&mac=${mac}&version=${version}&lrn=${lrn}`;
        }
        else return `${BASE_URL}/hc-monitoring/list?page=${page}&is_connect=${status}&is_master=${type}&mac=${mac}&version=${version}&lrn=${lrn}`;

    }
    const doSearch = async (e) => {
        let url = changeStringCase();

        console.log('url', url);
        try {
            const res = await axios.get(url, config);
            console.log('res=========', res.data);
            if (res.data.success) {
                console.log('search');
                setDataHc(res.data.data)

            }
            else {
                localStorage.removeItem('access_token');
                return (<Redirect to="/login" />)
            }

        } catch (err) {
            console.log('abc', err)

        }
    }
    const doGetListHc = async () => {
        const url = BASE_URL + '/hc-monitoring/list';

        try {
            const res = await axios.get(url, config);
            console.log('resHC=========', res.data.statusCode);
            if (res.data.success) {
                setDataHc(res.data.data)
                // console.log('a');
                // let final = []
                // final.push({ name: 'Online', value: res.data.data.online })
                // final.push({ name: 'Offline', value: res.data.data.offline })
                // setDataChart(final)
                // console.log(final);
            }
            else {
                console.log('abc');
                localStorage.removeItem('access_token');
                return (<Redirect to="/login" />)
            }

        } catch (err) {
            console.log('abc', err)

        }
    }
    useEffect(() => {
        let mounted = true;
        console.log('access_token', localStorage.getItem('access_token'));
        doGetChart()
        doGetListHc()
    }, [])
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return; 
      }
      doSearch();
      console.log('useEffect ran. count is: ', page);
    }, [page]);
    const handleRowClick = (row) => {
        console.log('row', row);
        history.push({pathname: `/detail` , state:  row.lrn });

    }
    const [secondTableCurrentPage, setSecondTableCurrentPage] = useState(0);

    const pageSize = 36;
    const secondTablePagesCount = Math.ceil(secondTable.length / pageSize);


    const setSecondTablePage = (e, index) => {
        e.preventDefault();
        setSecondTableCurrentPage(index);
    }
    const [dataChart, setDataChart] = useState([
        { name: 'Online', value: 400 },
        { name: 'Offline', value: 1200 },

    ])
    return (
        <div>
            <Navbar style={{ justifyContent: 'space-around' }}>

                <Widget className={s.widget_pie}>
                    <Row style={{ height: 200, alignItems: 'center' }}>
                        <Col >
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={dataChart}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {dataChart.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Col>

                        <Col>
                            <FormText color="black" className="my-3">{`All: ${dataChart[0].value + dataChart[1].value} devices`}</FormText>

                            {dataChart.map((entry, index) => (
                                <div className={s.label}>
                                    <Dot color={COLORS[index]} />
                                    <span className="body-3 ml-2">{entry.value + " " + entry.name}</span>
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
                                    value={mac}
                                    onChange={(e) => setMac(e.target.value)}
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
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
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
                                    value={lrn}
                                    onChange={(e) => setLrn(e.target.value)}
                                    type='search'
                                    required
                                    name="Lrn"
                                    placeholder="Lrn"
                                />
                            </FormGroup>
                            {/* <FormGroup className="my-3">
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
                            </FormGroup> */}
                        </Col>

                        <Col xs={12} md={4}>
                            <FormText className="my-3">Status</FormText>
                            <FormGroup
                                check
                                inline
                            >
                                <Input checked={status === 2} type="checkbox" onChange={(e) => setStatus(2)} />
                                <Label check>
                                    All
                                </Label>
                            </FormGroup>
                            <FormGroup
                                check
                                inline
                            >
                                <Input checked={status === 0} type="checkbox" onChange={(e) => setStatus(0)} />
                                <Label check>
                                    Offline
                                </Label>
                            </FormGroup>
                            <FormGroup
                                check
                                inline
                            >
                                <Input checked={status === 1} type="checkbox" onChange={(e) => setStatus(1)} />
                                <Label check>
                                    Online
                                </Label>
                            </FormGroup>
                            <FormText className="my-3">Type</FormText>
                            <FormGroup
                                check
                                inline
                            >
                                <Input checked={type === 2} type="checkbox" onChange={(e) => setType(2)} />
                                <Label check>
                                    All
                                </Label>
                            </FormGroup>
                            <FormGroup
                                check
                                inline
                            >
                                <Input checked={type === 1} type="checkbox" onChange={(e) => setType(1)} />
                                <Label check>
                                    Master
                                </Label>
                            </FormGroup>
                            <FormGroup
                                check
                                inline
                            >
                                <Input checked={type === 0} type="checkbox" onChange={(e) => setType(0)} />
                                <Label check>
                                    Slave
                                </Label>
                            </FormGroup>
                        </Col>
                        <div className={s.button_submit}>
                            <Button color="success" onClick={doSearch}>Search</Button>
                        </div>
                    </Row>
                </Widget>

            </Navbar>
            <Row>
                <Col>
                    <Row className="mb-4">
                        <Col>
                            <Widget>
                                <div className={s.tableTitle}>
                                    <div className="headline-2">Tổng quan</div>
                                </div>
                                <div className="widget-table-overflow">
                                    <Table className="table-striped table-borderless table-hover" responsive>
                                        <thead>
                                            <tr>
                                                <th>MAC</th>
                                                <th>Local IP</th>
                                                <th>Owner account</th>
                                                <th>Home name</th>
                                                <th>Current {'\n'} version</th>
                                                <th>Active</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {secondTable
                                                .slice(
                                                    secondTableCurrentPage * pageSize,
                                                    (secondTableCurrentPage + 1) * pageSize
                                                )
                                                .map((item, index) => (

                                                    <tr onClick={() => handleRowClick(item)} key={uuidv4()}>
                                                        {/* <Link to={{pathname: `/detail`,state: item.mac}} > */}
                                                        <td>{item.mac}</td>
                                                        <td>{item.localip}</td>
                                                        <td>{item.owner_account}</td>
                                                        <td>{item.home}</td>
                                                        <td>{item.hc_version}</td>
                                                        {item.is_active == 1 ? <td><Badge style={{ backgroundColor: base_color }} >Yes</Badge></td> : <td><Badge style={{ backgroundColor: inactive_color }} >No</Badge></td>}
                                                        {item.is_master == 1 ? <td><Badge style={{ backgroundColor: base_color }} >Master</Badge></td> : <td><Badge style={{ backgroundColor: inactive_color }} >Slave</Badge></td>}
                                                        {item.is_connect == 1 ? <td><Badge style={{ backgroundColor: base_color }} >Connect</Badge></td> : <td><Badge style={{ backgroundColor: inactive_color }} >Disconnect</Badge></td>}
                                                        {/* </Link> */}
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                    <Pagination className="pagination-with-border">
                                        <PaginationItem disabled={page <= 1}>
                                            <PaginationLink
                                                onClick={e => setPage((count) => count-1)}
                                                previous
                                            />
                                        </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        
                                        <PaginationItem disabled={!secondTable.length}>
                                            <PaginationLink
                                                onClick={e => setPage((count) => count+1)}
                                                next
                                            />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </Widget>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}
export default Dashboard;
