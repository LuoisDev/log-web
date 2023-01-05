import React, { useState } from "react";
import { FormText } from "reactstrap";
import Chart from 'react-apexcharts'
import moment from "moment";

const Detail = function (props) {
 const [options, setOptions] = useState( {
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
        // labels: {
        //   formatter: function (value) {
        //     return moment(value).format("hh:mm");
        //   }
        // }
        type: 'datetime'
      },
    yaxis: {
      show: false
    },
    // grid: {
    //   row: {
    //     colors: ['#f3f4f5', '#fff'],
    //     opacity: 1
    //   }
    // }
  });
  const [series, setSeries] = useState( [
    {
        data: [
          {
            x: 'On',
            y: [
                moment('24-12-2019 09:15', "DD-MM-YYYY hh:mm").valueOf(),
                moment('24-12-2019 10:16', "DD-MM-YYYY hh:mm").valueOf()            ],
            fillColor: '#008C4F'
          },
          {
            x: 'Off',
            y: [
                moment('24-12-2019 10:16', "DD-MM-YYYY hh:mm").valueOf(),
                moment('24-12-2019 12:17', "DD-MM-YYYY hh:mm").valueOf()            ],
            fillColor: '#B8C3BF'
          },
          {
            x: 'On',
            y: [
                moment('24-12-2019 12:17', "DD-MM-YYYY hh:mm").valueOf(),
                moment('24-12-2019 14:18', "DD-MM-YYYY hh:mm").valueOf()            ],
            fillColor: '#008C4F'
          },
          {
            x: 'Off',
            y: [
                moment('24-12-2019 14:18', "DD-MM-YYYY hh:mm").valueOf(),
                moment('24-12-2019 18:19', "DD-MM-YYYY hh:mm").valueOf()            ],
            fillColor: '#B8C3BF'
          },
          {
            x: 'On',
            y: [
                moment('24-12-2019 18:20', "DD-MM-YYYY hh:mm").valueOf(),
                moment('26-12-2019 23:21', "DD-MM-YYYY hh:mm").valueOf()            ],
            fillColor: '#008C4F'
          },
        ]
      }
  ],)
    console.log(props.location.state);

  return (
    <div>
   <FormText>{props.location.state}</FormText>
   <Chart options={options} series={series} type='rangeBar' width="1000" height='200' />

    </div>
  )
}

export default Detail;
