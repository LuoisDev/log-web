import React, { useEffect, useState } from "react";
import { Badge, Button, FormText, Table } from "reactstrap";
import Chart from 'react-apexcharts'
import moment from "moment";
import { BASE_URL } from "../../const/url";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';

import { DateRangePicker, Stack } from 'rsuite';
import Widget from "../../components/Widget/Widget";
import { base_color, inactive_color } from "../../const";

const Detail = function (props) {
    const [historyData, setHistoryData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [value, setValue] = React.useState([
        new Date(),
        new Date()
    ]);
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }

    useEffect(() => {
        let mounted = true;
        console.log('access_token', localStorage.getItem('access_token'));
        doGetDetail()

    }, [startDate])

    const doGetDetail = async (e) => {

        const url = `${BASE_URL}/hc-monitoring/online-offline-history?lrn=${localStorage.getItem('lrn')}&start_time=${startDate}&end_time=${endDate}`;
        console.log('url', url);
        try {
            console.log(config);
            const res = await axios.get(url, config);
            let data_final = []
            let pre_data = []
            console.log('res.data', res.data);
            setHistoryData(res.data.data)
            // pre_data=res.data.data
            pre_data.push(res.data.data[0])
            for (let index = 0; index < res.data.data.length; index) {
                for (let index2 = (index + 1); index2 < (res.data.data.length); index2++) {
                    if (res.data.data[index].connected != res.data.data[index2].connected) {
                        pre_data.push(res.data.data[index2])
                        index = index2
                        break
                    }
                }

                console.log('index', index); //loop 7 
                if (index == (res.data.data.length - 1)) {
                    break
                }
            }
            const process = (value, index, array) => {
                console.log('abs', value);
                if (index <= (pre_data.length - 2)) {
                    data_final.push({
                        fillColor: value.connected == 0 ? '#B8C3BF' : '#008C4F', x: value.connected == 0 ? "Offline" : "Online",
                        y: [moment.unix(value.time).valueOf(), moment.unix(pre_data[index + 1].time).valueOf()]
                    })
                }
            }
            pre_data.forEach(process)
            console.log('data_final', res.data.data, data_final);
            setSeries([{ data: data_final }])
            console.log('asc', series);
            console.log('resDetail=========', res.data.data);
            if (res.data.success) {
                console.log('a');
            }
            else if (res.data.statusCode === 500) {
                localStorage.removeItem('access_token');
                return (<Redirect to="/login" />)
            }

        } catch (err) {
            console.log('abc', err)

        }
    }
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'rangeBar'
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                dataLabels: {
                    hideOverflowingLabels: false
                }
            }
        },
        // dataLabels: {

        //   style: {
        //     colors: ['#f3f4f5', '#fff']
        //   }
        // },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return moment(value).format("DD/MM HH:mm");
                }
            }
            // type: 'datetime'
        },
        yaxis: {
            show: false
        },
        // grid: {
        //   row: {
        //     colors: ['#f3f4f5', '#fff'],
        //     opacity: 1
        //   }
        // },
        tooltip: {
            enabled: true,
            followCursor: true,
            custom: undefined,
            style: {
                fontSize: '12px',
                fontFamily: undefined
            },

            x: {
                show: true,
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    console.log(moment(series[seriesIndex][dataPointIndex]).format("DD/MM/YYYY HH:mm"));
                    return w.globals.seriesX[seriesIndex][dataPointIndex]
                }
            },
            y: {
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    console.log('y', value, series, seriesIndex, dataPointIndex, w);
                    return moment(w.globals.seriesRangeStart[seriesIndex][dataPointIndex]).format("DD/MM/YYYY HH:mm") + ' - ' + moment(series[seriesIndex][dataPointIndex]).format("DD/MM/YYYY HH:mm")
                },
                title: {
                    formatter: (seriesName) => '',
                },
            },

        }

    });
    const [series, setSeries] = useState([
        {
            data: [
                {
                    x: 'Online',
                    y: [
                        moment('24-12-2019 09:15', "DD-MM-YYYY HH:mm").valueOf(),
                        moment('24-12-2019 10:16', "DD-MM-YYYY HH:mm").valueOf()],
                    fillColor: '#008C4F'
                },
                {
                    x: 'Off',
                    y: [
                        moment('24-12-2019 10:16', "DD-MM-YYYY HH:mm").valueOf(),
                        moment('24-12-2019 12:17', "DD-MM-YYYY HH:mm").valueOf()],
                    fillColor: '#B8C3BF'
                },
                {
                    x: 'Online',
                    y: [
                        moment('24-12-2019 12:17', "DD-MM-YYYY HH:mm").valueOf(),
                        moment('24-12-2019 14:18', "DD-MM-YYYY HH:mm").valueOf()],
                    fillColor: '#008C4F'
                },
                {
                    x: 'Off',
                    y: [
                        moment('24-12-2019 14:18', "DD-MM-YYYY HH:mm").valueOf(),
                        moment('24-12-2019 18:19', "DD-MM-YYYY HH:mm").valueOf()],
                    fillColor: '#B8C3BF'
                },
                {
                    x: 'Online',
                    y: [
                        moment('24-12-2019 18:20', "DD-MM-YYYY HH:mm").valueOf(),
                        moment('26-12-2019 23:21', "DD-MM-YYYY HH:mm").valueOf()],
                    fillColor: '#008C4F'
                },
            ]
        }
    ],)
    console.log(props.location.state);

    const onOk = (value) => {
        console.log(moment(value[0]).valueOf());
        setStartDate(moment(value[0]).valueOf())
        setEndDate(moment(value[1]).valueOf())
    }
    const onClean = () => {
        setStartDate('')
        setEndDate('')
    }
    return (
        <div>
            <Stack direction="row" justifyContent='space-around'>
                <FormText>{props.location.state}</FormText>
                <DateRangePicker
                    value={[new Date(), new Date()]}
                    // onChange={setValue}
                    showMeridian
                    onOk={onOk}
                    onClean={onClean}
                    ranges={[]}
                    format=" HH:mm:ss yyyy-MM-dd"
                    defaultCalendarValue={[new Date(), new Date()]}
                />
            </Stack>

            <Chart options={options} series={series} type='rangeBar' width='100%' height='200' />
            <Widget>
                <div>
                    <div className="headline-2">Lịch sử HC</div>
                </div>
                <div className="widget-table-overflow">
                    <Table className="table-striped table-borderless table-hover" responsive>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData

                                .map((item, index) => (

                                    <tr>
                                        {/* <Link to={{pathname: `/detail`,state: item.mac}} > */}
                                        <td>{index}</td>
                                        <td>{moment.unix(item.time).format("HH:mm:ss MM/DD/YYYY")}</td>
                                        {item.connected == 1 ? <td><Badge style={{ backgroundColor: base_color }} >Online</Badge></td> : <td><Badge style={{ backgroundColor: inactive_color }} >Offline</Badge></td>}
                                        {/* </Link> */}
                                    </tr>
                                ))}
                        </tbody>
                    </Table>

                </div>
            </Widget>
        </div>
    )
}

export default Detail;
