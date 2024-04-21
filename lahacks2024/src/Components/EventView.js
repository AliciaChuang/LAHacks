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
    const [interest, setInterest] = React.useState(false);
    const handleInterest = () => {
        setInterest(true);
        alert("Subscribed to event")
    }


    return (
      <Box
        alignItems="center"
        className="info-bg"
      >
        <div className='fonts'>
            <br></br>
            <div className='event-title'>
                {event_info.event_name}
            </div>
            <br></br>
            <div>
                <Chip label={event_info.category} color={color_map[event_info.category]} />
            </div>
            <br></br>
            Time: &nbsp;
            {event_info.event_time}
            <br></br>
            <br></br>
            Event Description: 
        </div>
        <div>
            {event_info.description}
        </div>
        <div className='footer'>
            <Button className="interested"
                onClick={handleInterest}>
                Interested
            </Button>
            <div className="num-interested">
                <UserModal user={user} num_interested={3}></UserModal>
            </div>
        </div>
      </Box>
    );
  }