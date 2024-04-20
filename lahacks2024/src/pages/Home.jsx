import {MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'
import CreatePostModal from "../Components/CreatePostModal"
import "leaflet/dist/leaflet.css"
import "./Home.scss"
import { useEffect, useState, useContext } from "react"
import MultiSelect from "../Components/MultiSelect"
import EventView from "../Components/EventView"
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import getMarkerIcon from '../Components/MarkerIcon';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { authContext } from "../auth"
import { EventMarkersContext, EventMarkersProvider } from '../Components/EventMarkers'

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


export function Home() {
    const [latitude, setLatitude] = useState(33.645887)
    const [longitude, setLongitude] = useState(-117.842694)
    const [user] = useContext(authContext)
    // console.log(latitude, longitude)

    // Filter variables
    const [type, setType] = useState([])
    const [category, setCategory] = useState([])
    const [startTime, setStartTime] = useState(dayjs('2022-04-17T00:00'))
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T23:00'))

    const eventMarkers = useContext(EventMarkersContext)["eventMarkers"]
    console.log(eventMarkers)

    const handleFilterChange = () => {
        const new_filters = {
            "type": type,
            "category": category,
            "start_time": startTime,
            "end_time": endTime,
            "user_id": user
        }
        // call API to update filters
        console.log(new_filters)
    }

    const newStartTime = (e) => {
        setStartTime(e);
        handleFilterChange();
    }

    const newEndTime = (e) => {
        setEndTime(e);
        handleFilterChange();
    }

    const newType = (e) => {
        const new_filters = {
            "type": e,
            "category": category,
            "start_time": startTime,
            "end_time": endTime,
            "user_id": user
        }
        // call API to update filters
        console.log(new_filters)
    }

    const newCategory = (e) => {
        const new_filters = {
            "type": type,
            "category": e,
            "start_time": startTime,
            "end_time": endTime,
            "user_id": user
        }
        // call API to update filters
        console.log(new_filters)
    }


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

    const category_color_marker = {
        "Catching": "green",
        "Raiding": "red",
        "Trading": "blue",
    };


    return (
        <div className="home">
            <div className="header">
                <div className="title">
                    Pokémon Go Touch Grass
                </div>
                <div><Link to="../">
                        <Button className="sign-out">
                                Sign Out
                            </Button>
                        </Link>
                    </div>
            </div>
            
            <div className="home-main">
                <div className="filter">
    
                    <div className="search-title">Search Events</div>
                    <br></br>
                    <div className="filter-position">
                        Event Type
                        <br></br>
                        <MultiSelect options={event_type} colors={type_color} setValue={setType} handleFilterChange={newType}></MultiSelect>
                        <br></br>
                        Event Category
                        <br></br>
                        <MultiSelect options={event_category} colors={category_color} setValue={setCategory} handleFilterChange={newCategory}></MultiSelect>
                        <br></br>
                        Time Range 
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                defaultValue={dayjs('2022-04-17T00:00')}
                                ampm={false}
                                className="light-bg"
                                onChange={newStartTime}
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
                                onChange={newEndTime}
                                />
                        </LocalizationProvider>
                    </div>
                    <div className="create-post">
                        <CreatePostModal latitude={latitude} longitude={longitude} user={user}></CreatePostModal>
                    </div>
                </div>
                
                <MapContainer center={[latitude, longitude]} zoom={17}>
                    <Recenter latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
                    <EventMarkersProvider>
                        {eventMarkers.map((eventMarker) => (
                            <Marker position={eventMarker.location} icon={getMarkerIcon(category_color_marker[eventMarker.category])}/>
                        ))}
                    </EventMarkersProvider>
                    <TileLayer 
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                </MapContainer>
                <div className="description">
                    <div>
                        <EventView user={user} event_info={event_info_test}></EventView>
                    </div>
                </div>
            </div>
        </div>
    )
}