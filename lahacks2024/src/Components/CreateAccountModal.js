import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import "./CreateAccountModal.css"

export default function CreateAccountModal() {
  const [show, setShow] = useState(false);

  function handleClose() {
    // Store new user info in database
    const user_info = {"user_id": username, "password": password, "friend_code": friend_code, "game_name":game_name}
    console.log(user_info)
    setShow(false);
  }
  const handleShow = () => setShow(true);

  // Create account variables
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [friend_code, setFriendCode] = useState(" ");
  const [game_name, setGameName] = useState(" ");

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
              onChange={(e) => {setUsername(e.target.value)}}
              id="user_id_text">
            </TextField>
            <br></br>
            <br></br>
            Password* 
            <br></br>
            <TextField required
              fullWidth
              onChange={(e) => {setPassword(e.target.value)}}
              id="password_text">
            </TextField>
            <br></br>
            <br></br>
            Friend Code (optional)
            <br></br>
            <TextField 
              fullWidth
              onChange={(e) => {setFriendCode(e.target.value)}}
              id="friend_code_text">
            </TextField>
            <br></br>
            <br></br>
            In Game Name (optional)
            <br></br>
            <TextField 
              fullWidth
              onChange={(e) => {setGameName(e.target.value)}}
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

