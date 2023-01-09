import React, { useEffect, useState } from "react";
import { FormText } from "reactstrap";
import Chart from 'react-apexcharts'
import moment from "moment";
import { BASE_URL } from "../../const/url";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

const Detail = function (props) {
  
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }
    const [selectionRange,setSelectionRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }])
    useEffect(() => {
        let mounted = true;
        console.log('access_token', localStorage.getItem('access_token'));
        doGetDetail()

    }, [selectionRange])
    const handleSelect = (ranges) => {
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
        setSelectionRange([ranges.selection])
        console.log(moment(selectionRange[0].startDate).utc().unix(), moment(selectionRange[0].endDate).utc().unix());
    }
  
    const doGetDetail = async (e) => {

        const url = `${BASE_URL}/hc-monitoring/online-offline-history?lrn=${props.location.state}&start_time=${moment(selectionRange[0].startDate).utc().unix()}&end_time=${moment(selectionRange[0].endDate).utc().unix()}`;
        console.log('url', url);
        try {
            console.log(config);
            const res = await axios.get(url, config);
            let data_final = []
            let pre_data = []
            console.log('res.data', res.data);
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
                    x: 'On',
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
                    x: 'On',
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
                    x: 'On',
                    y: [
                        moment('24-12-2019 18:20', "DD-MM-YYYY HH:mm").valueOf(),
                        moment('26-12-2019 23:21', "DD-MM-YYYY HH:mm").valueOf()],
                    fillColor: '#008C4F'
                },
            ]
        }
    ],)
    console.log(props.location.state);
    
    return (
        <div>
            <FormText>{props.location.state}</FormText>
            <DateRangePicker
              showSelectionPreview={true}

                ranges={selectionRange}
                onChange={handleSelect}
            />
            <Chart options={options} series={series} type='rangeBar' width='100%' height='200' />

        </div>
    )
}

export default Detail;
