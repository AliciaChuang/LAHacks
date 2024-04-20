import * as React from 'react';
import Box from '@mui/material/Box';
import "./EventView.css"
import Chip from '@mui/material/Chip';
import Button from 'react-bootstrap/Button';
import UserModal from './UserModal';

const color_map = {
    "Catching": "success",
    "Raiding": "error",
    "Trading": "primary",
}

export default function EventView({event_info, user}) {
    return (
      <Box
        alignItems="center"
        className="info-bg"
      >
        <div className='fonts'>
            <br></br>
            <div className='event-title'>
                {event_info.name}
            </div>
            <br></br>
            <div>
                <Chip label={event_info.category} color={color_map[event_info.category]} />
            </div>
            <br></br>
            Time: &nbsp;
            {event_info.time}
            <br></br>
            <br></br>
            Event Description: 
        </div>
        <div>
            {event_info.description}
        </div>
        <div>
            <Button className="interested"
                onClick={() => {
                       alert('clicked');}}>
                Interested
            </Button>
        </div>
        <div className="num-interested">
            <UserModal user={user} num_interested={10}></UserModal>
        </div>
      </Box>
    );
  }