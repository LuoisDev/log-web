import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from 'google-map-react';
import { BASE_URL } from "../../const/url";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import logoLumi from "../../assets/Group.svg";

const AnyReactComponent = ({ text }) => <img src={logoLumi}></img>;

const  Map= function (props) {
    const [marker, setMarker] = useState([]);

  const defaultProps = {
    center: {
      lat: 20.9763271,
      lng: 105.791341
    },
    zoom: 11
  };
  let config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
}
  const doGetListHc = async () => {
    const url = BASE_URL + '/hc-monitoring/list';

    try {
        const res = await axios.get(url, config);
        console.log('resHC=========his', [...new Set(res.data.data)]);
        if (res.data.success) {
            setMarker([...new Set(res.data.data)].filter((item, index) => { 
                if (item.lat && item.long)
                return item;
             
                }))
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
    doGetListHc()
}, [])
const isFirstRender = useRef(true);
console.log('marker', marker);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={defaultProps.zoom}
      >
        {
            marker.map((item, index) => {
                return (
                    <AnyReactComponent
                        lat={item.lat}
                        lng={item.long}
                    />
                )})}
            
        
       
      </GoogleMapReact>
    </div>
  );
}
export default Map;
