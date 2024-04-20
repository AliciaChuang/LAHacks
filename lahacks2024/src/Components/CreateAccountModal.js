import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import "./CreateAccountModal.css"

export default function CreateAccountModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='font-georgia-create'>
        <Button variant="link" onClick={handleShow}>
          Create Account
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-width'>
            Username*
            <br></br>
            <TextField required
              fullWidth
              id="user_id_text">
            </TextField>
            <br></br>
            <br></br>
            Password* 
            <br></br>
            <TextField required
              fullWidth
              id="password_text">
            </TextField>
            <br></br>
            <br></br>
            Friend Code (optional)
            <br></br>
            <TextField 
              fullWidth
              id="friend_code_text">
            </TextField>
            <br></br>
            <br></br>
            In Game Name (optional)
            <br></br>
            <TextField 
              fullWidth
              id="game_name_text">
            </TextField>
            <br></br>
            <br></br>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

