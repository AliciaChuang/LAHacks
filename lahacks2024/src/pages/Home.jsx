import {MapContainer, TileLayer, useMap} from "react-leaflet" 
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

export function Home() {
    const [latitude, setLatitude] = useState(33.645887)
    const [longitude, setLongitude] = useState(-117.842694)

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


    const Recenter = () => {
        const map = useMap();

        useEffect(() => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                map.panTo([latitude, longitude]);
            }, function (e) {
                //Your error handling here
            }, {
                enableHighAccuracy: true
            });
        });
        return null;
    }

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
                        <CreatePostModal></CreatePostModal>
                    </div>
                </div>
                <MapContainer center={[latitude, longitude]} zoom={17}>
                    <Recenter />
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