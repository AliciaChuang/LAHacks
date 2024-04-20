// import Leaflet from 'leaflet'
import {MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'
import CreatePostModal from "../Components/CreatePostModal"
import "leaflet/dist/leaflet.css"
import "./Home.scss"
import { useEffect, useState } from "react"
import MultiSelect from "../Components/MultiSelect"
import EventView from "../Components/EventView"
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import getMarkerIcon from '../Components/MarkerIcon';
// import { authContext } from "../auth"
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Recenter = (props) => {
    const map = useMap();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition( (position) => {
            props.setLatitude(position.coords.latitude);
            props.setLongitude(position.coords.longitude);
            map.panTo([props.latitude, props.longitude]);
        }, function (e) {
            //Your error handling here
        }, {
            enableHighAccuracy: true
        });
    });

    return null;
}

// function getMarkerIcon(color = '') {
//     return Leaflet.divIcon({
//         /**
//          * Adds offset to __marker__ for stacking markers.
//          */
//         iconAnchor: [28, 46],

//         /**
//          * Adds offset to __popup__ for stacking markers.
//          */
//         popupAnchor: [17, 46],

//         /**
//          * Removes styling added by leaflet classes.
//          */
//         className: '',

//         /**
//          * what the marker will look like
//          */
//         html: `<div style="position:relative;">
//              <span style="background-color: ${color};
//                    width: 1.75rem;
//                    height: 1.75rem;
//                    display: block;
//                    border-radius: 1.9rem 1.9rem 0;
//                    transform: rotate(45deg);
//                    border: 1px solid #FFFFFF">
//              </span>
//              <div style="width: 1.75rem;
//                          height: 1.75rem;
//                          text-align: center; 
//                          color: white" >
//              </div>
//            </div>`,
//     });
// }

// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow,
//     iconSize: [28, 46],
//     iconAnchor: [17, 46]
// });

// L.Marker.prototype.options.icon = DefaultIcon;

export function Home() {
    const [latitude, setLatitude] = useState(33.645887)
    const [longitude, setLongitude] = useState(-117.842694)
    // const [user] = useContext(authContext)
    console.log(latitude, longitude)

    const event_type = [
        'Owner',
        'Interested',
        'Discover',
    ];
    const type_color = {
        'Owner': "default",
        'Interested': "default",
        'Discover': "default",
    };

    const event_category = [
        'Raiding',
        'Catching',
        'Trading',
    ];
    const category_color = {
        "Catching": "success",
        "Raiding": "error",
        "Trading": "primary",
    };

    const event_info_test= {
        name: "Bellsprout Community Day",
        category: "Catching",
        time: "14:00",
        description: "Come catch bellsprouts with me! Will be walking around UCLA campus for ~2 hours."
    };


  

    return (
        <div className="home">
            <div className="header">
                <div className="title">
                    Pokémon Go Touch Grass
                </div>
            </div>
            
            <div className="home-main">
                <div className="filter">
    
                    <div className="search-title">Search Events</div>
                    <br></br>
                    <div className="filter-position">
                        Event Type
                        <br></br>
                        <MultiSelect options={event_type} colors={type_color}></MultiSelect>
                        <br></br>
                        Event Category
                        <br></br>
                        <MultiSelect options={event_category} colors={category_color}></MultiSelect>
                        <br></br>
                        Time Range 
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                defaultValue={dayjs('2022-04-17T00:00')}
                                ampm={false}
                                className="light-bg"
                                />
                        </LocalizationProvider>
                        <br></br>
                        To 
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                defaultValue={dayjs('2022-04-17T23:00')}
                                ampm={false}
                                className="light-bg"
                                />
                        </LocalizationProvider>
                    </div>
                    <div className="create-post">
                        <CreatePostModal latitude={latitude} longitude={longitude}></CreatePostModal>
                    </div>
                </div>
                
                <MapContainer center={[latitude, longitude]} zoom={17}>
                    <Recenter latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
                    <Marker position={[latitude, longitude]} icon={getMarkerIcon('skyblue')}/>
                    <TileLayer 
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                </MapContainer>
                <div className="description">
                    <div>
                        <EventView event_info={event_info_test}></EventView>
                    </div>
                </div>
            </div>
        </div>
    )
}