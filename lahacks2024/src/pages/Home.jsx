import {MapContainer, TileLayer, useMap} from "react-leaflet" 
import "leaflet/dist/leaflet.css"
import "./Home.scss"
import { useEffect, useState } from "react"

export function Home() {
    const [latitude, setLatitude] = useState(33.645887)
    const [longitude, setLongitude] = useState(-117.842694)

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
            <div className="header">Pokemon Go Touch Some Grass</div>
            <div className="home-main">
                <div className="filter">Filter</div>
                <MapContainer center={[latitude, longitude]} zoom={17}>
                    <Recenter />
                    <TileLayer 
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                </MapContainer>
                <div className="description">Description</div>
            </div>
        </div>
    )
}