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


export default function CreatePostModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                    ampm={false}
                    />
            </LocalizationProvider>
            <br></br>
            <br></br>
            Location
            <br></br>
            Insert map here
            <br></br>
            <br></br>
            Description
            <br></br>
            <TextField
                id="description-text"
                multiline
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
          <Button variant="primary" onClick={handleClose}>
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

