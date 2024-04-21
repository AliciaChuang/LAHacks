import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Reviews from './Reviews';
import "./UserModal.css"
import {
    ScrollView,
  } from 'react-native';

export default function UserModal({num_interested, user}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const attendees = ["Ru Manoharan", "Brian Lin", "Glendon Thai"] //Replace with API call 

  return (
    <>
      <div className='font-georgia-create'>
        <Button variant="link" onClick={handleShow}>
          + {num_interested}
        </Button>
      </div>

      <Modal className='size-adjust' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Attendees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ScrollView>
            <div>
                {attendees.map(function(attendee) {
                    return (
                        <div>
                        <Reviews user={user} reviewee={attendee}></Reviews>
                        <br></br>
                        <br></br>
                        </div>
                    )
                })}
            </div>
            </ScrollView>
        </Modal.Body>
      </Modal>
    </>
  );
}

