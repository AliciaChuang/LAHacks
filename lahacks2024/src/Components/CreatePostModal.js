import { useState } from 'react';
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import "./CreatePostModal.css"
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import getMarkerIcon from '../Components/MarkerIcon';




const event_category = [
    {
      value: 'Raiding',
      label: 'Raiding',
    },
    {
      value: 'Catching',
      label: 'Catching',
    },
    {
      value: 'Trading',
      label: 'Trading',
    },
  ];

const category_color = {
  "Catching": "green",
  "Raiding": "red",
  "Trading": "blue",
};

const SetMarker = (props) => {
    useMapEvents({
        click(e) {
            props.setMarkerLocation(e.latlng);
        },
    });
    return null;
};

export default function CreatePostModal(props) {
  const user = props.user
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [description, setDescription] = useState('');
  const [markerLocation, setMarkerLocation] = useState(null);
  const [markerColor, setMarkerColor] = useState('purple');

  const handleClose = () => {
    setShow(false);
    setMarkerLocation(null);
    setMarkerColor('purple');
  }

  const handleCreate = () => {
    const event_info = {
      "user_id": user,
      "event_name": eventName,
      "category": category,
      "event_time": eventTime,
      "location": markerLocation,
      "description": description
    }
    // Call API
    console.log(event_info);
    setShow(false);
    setMarkerLocation(null);
    setMarkerColor('purple');
  }

  const handleShow = () => setShow(true);
  const handleSelectCategory = (e) => {
    setMarkerColor(category_color[e.target.value]);
    setCategory(e.target.value);
  }

  return (
    <>
      <div className='font-georgia-create'>
        <Button variant="primary" className="create-button" onClick={handleShow}>
          Create Event
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-width'>
            Event Name
            <br></br>
            <TextField required
              variant="standard"
              fullWidth
              onChange={(e) => {setEventName(e.target.value)}}
              id="event_name_text">
            </TextField>
            <br></br>
            <br></br>
            Category 
            <br></br>
            <TextField
                id="select-category"
                select
                defaultValue=""
                helperText="Please select your event category"
                variant="standard"
                onChange={handleSelectCategory}
                >
                {event_category.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br></br>
            <br></br>
            Event Time
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    defaultValue={dayjs('2022-04-17T00:00')}
                    onChange={(e) => {setEventTime(`${e.get('hour')}:${e.get('minute')}`)}}
                    ampm={false}
                    />
            </LocalizationProvider>
            <br></br>
            <br></br>
            Location
            <br></br>
            <MapContainer id="map" center={[props.latitude, props.longitude]} zoom={15}>
              <SetMarker setMarkerLocation={setMarkerLocation}/>
              {markerLocation !== null ? <Marker position={markerLocation} icon={getMarkerIcon(markerColor)}/> : null}
              <TileLayer 
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </MapContainer>
            <br></br>
            <br></br>
            Description
            <br></br>
            <TextField
                id="description-text"
                multiline
                onChange={(e) => {setDescription(e.target.value)}}
                fullWidth
                rows={4}
                />
            <br></br>
            <br></br>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

