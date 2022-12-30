import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Col,
    Row,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Label,
    Badge,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";

// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import MUIDataTable from "mui-datatables";

import cloudIcon from "../../assets/tables/cloudIcon.svg";
import funnelIcon from "../../assets/tables/funnelIcon.svg";
import optionsIcon from "../../assets/tables/optionsIcon.svg";
import printerIcon from "../../assets/tables/printerIcon.svg";
import searchIcon from "../../assets/tables/searchIcon.svg";
import moreIcon from "../../assets/tables/moreIcon.svg";

import s from "./Tables.module.scss";
import data from "./data.json";

const Dashboard = function () {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [secondTable] = useState(data);
    const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
    const [secondTableCurrentPage, setSecondTableCurrentPage] = useState(0);
    const [tableDropdownOpen, setTableMenuOpen] = useState(false);

    const pageSize = 36;
    const secondTablePagesCount = Math.ceil(secondTable.length / pageSize);

    const setFirstTablePage = (e, index) => {
        e.preventDefault();
        setFirstTableCurrentPage(index);
    }

    const setSecondTablePage = (e, index) => {
        e.preventDefault();
        setSecondTableCurrentPage(index);
    }

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    }



    const tableMenuOpen = () => {
        setTableMenuOpen(!tableDropdownOpen);
    }
    return (
        <div>
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
                                                .map(item => (
                                                    <tr key={uuidv4()}>

                                                        <td>{item.mac}</td>
                                                        <td>{item.localip}</td>
                                                        <td>Chưa có email</td>
                                                        <td>Chưa có tên nhà</td>
                                                        <td>{item.hc_version}</td>
                                                        <td>{item.is_active}</td>
                                                        <td>{item.is_master}</td>
                                                        <td>{item.is_connect}</td>
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
