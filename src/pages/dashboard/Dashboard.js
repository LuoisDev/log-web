import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Col,
    Row,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Badge,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";


import s from "./Tables.module.scss";
import data from "./data.json";
import { base_color, inactive_color } from "../../const/index.js";
import Header from "../../components/Header/Header.js";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../const/url.js";
import axios from 'axios';
import { logoutUser } from "../../actions/auth.js";

const Dashboard = function (props) {
    const history = useHistory();
    const [secondTable, setDataHc] = useState([]);
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
            else if (res.data.statusCode == 500){
                props.dispatch(logoutUser());
                history.push(`/login`);            
            }

        } catch (err) {
            console.log('abc', err.response.data.error)

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
            else if (res.data.statusCode == 500){
                console.log('abc');
                props.dispatch(logoutUser());
                history.push(`/login`);            
            }

        } catch (err) {
            console.log('abc', err.response.data.error)

        }
    }
    useEffect(() => {
        let mounted = true;
        console.log('access_token', localStorage.getItem('access_token'));
        doGetChart()
        doGetListHc()
    }, [])

    const handleRowClick = (row) => {
        history.push(`/detail`);

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
            <Header props={dataChart} ></Header>
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
                                                <th>Customer email</th>
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

                                                    <tr onClick={handleRowClick} key={uuidv4()}>
                                                        {/* <Link to={{pathname: `/detail`,state: item.mac}} > */}
                                                        <td>{item.mac}</td>
                                                        <td>{item.localip}</td>
                                                        <td>Chưa có email</td>
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
                                        <PaginationItem disabled={secondTableCurrentPage <= 0}>
                                            <PaginationLink
                                                onClick={e => setSecondTablePage(e, secondTableCurrentPage - 1)}
                                                previous
                                                href="#top"
                                            />
                                        </PaginationItem>
                                        {[...Array(secondTablePagesCount)].map((page, i) =>
                                            <PaginationItem active={i === secondTableCurrentPage} key={i}>
                                                <PaginationLink onClick={e => setSecondTablePage(e, i)} href="#top">
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}
                                        <PaginationItem disabled={secondTableCurrentPage >= secondTablePagesCount - 1}>
                                            <PaginationLink
                                                onClick={e => setSecondTablePage(e, secondTableCurrentPage + 1)}
                                                next
                                                href="#top"
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
