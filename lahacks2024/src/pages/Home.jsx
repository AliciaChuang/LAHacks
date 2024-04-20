import {MapContainer, TileLayer} from "react-leaflet" 
import "leaflet/dist/leaflet.css"
import "./Home.scss"

export function Home() {
    return (
        <div className="home">
            <div className="header">Pokemon Go Touch Some Grass</div>
            <div className="home-main">
                <div className="filter">Filter</div>
                <MapContainer center={[33.645887, -117.842694]} zoom={17}>
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