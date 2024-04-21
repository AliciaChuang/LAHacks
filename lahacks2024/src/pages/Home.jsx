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
import { useNavigate } from "react-router-dom";

const Recenter = (props) => {
    const map = useMap();
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user === undefined) {
            navigate("/");
            return;
        }
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
    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('23:00')
    const [eventInfo, setEventInfo] = useState(null)

    const eventMarkers = useContext(EventMarkersContext)["eventMarkers"]
    console.log(eventMarkers)

    const pad = (num) => {
        num = num.toString();
          while (num.length < 2) num = "0" + num;
          return num;
    }

    const event_info_test= {
        name: "Bellsprout Community Day",
        category: "Catching",
        time: "14:00",
        description: "Come catch bellsprouts with me! Will be walking around UCLA campus for ~2 hours."
    };

    const handleMarkerClick = async (post_id) => {
        // console.log('marker clicked', post_id)
        let baseURL = "http://127.0.0.1:8000/events/?";
        let params = new URLSearchParams({'post_id': post_id});

        const url = baseURL + params.toString()
        console.log(url)
        
        const response = await fetch(url)
        const markerData = await response.json()
        setEventInfo(markerData["data"])
      }

    const newStartTime = (e) => {
        setStartTime(`${pad(e.get('hour'))}:${pad(e.get('minute'))}`);
        const new_filters = {
            "type": type,
            "category": category,
            "start_time": `${pad(e.get('hour'))}:${pad(e.get('minute'))}`,
            "end_time": endTime,
            "user_id": user
        }
        // call API to update filters
        console.log(new_filters)
    }

    const newEndTime = (e) => {
        setEndTime(`${pad(e.get('hour'))}:${pad(e.get('minute'))}`);
        const new_filters = {
            "type": type,
            "category": category,
            "start_time": startTime,
            "end_time": `${pad(e.get('hour'))}:${pad(e.get('minute'))}`,
            "user_id": user
        }
        // call API to update filters
        console.log(new_filters)
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
                    <Recenter user={user} latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
                    <EventMarkersProvider>
                        {eventMarkers.map((eventMarker) => (
                            <Marker
                                position={eventMarker.location} 
                                icon={getMarkerIcon(category_color_marker[eventMarker.category])}
                                eventHandlers={{
                                    click: () => handleMarkerClick(eventMarker.post_id),
                                  }}
                                key={eventMarker.post_id}
                                data={eventMarker.post_id}
                            />
                        ))}
                    </EventMarkersProvider>
                    <TileLayer 
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                </MapContainer>
                <div className="description">
                    <div>
                        {eventInfo !== null ?<EventView user={user} event_info={eventInfo}></EventView> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}