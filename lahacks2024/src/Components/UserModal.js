import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./UserModal.css"

export default function UserModal({num_interested}) {
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
          <div>
            Placeholder for Users + Reviews (will be calling another component)
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

