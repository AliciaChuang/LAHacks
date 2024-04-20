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

  return (
    <>
      <div className='font-georgia-create'>
        <Button variant="link" onClick={handleShow}>
          + {num_interested}
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Attendees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ScrollView>
            <div>
                <Reviews user={user} reviewee="Person A"></Reviews>
                <br></br>
                <br></br>
                <Reviews user={user} reviewee="Person B"></Reviews>
                <br></br>
                <br></br>
                <Reviews user={user} reviewee="Person C"></Reviews>
            </div>
            </ScrollView>
        </Modal.Body>
      </Modal>
    </>
  );
}

