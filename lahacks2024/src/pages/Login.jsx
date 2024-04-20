//import { Link } from "react-router-dom"
import CreateAccountModal from "../Components/CreateAccountModal"
import "./Login.scss"
import gible from '../Assets/gible.png';
import welcome from '../Assets/welcome.png';
import TextField from '@mui/material/TextField';
import React, { useCallback, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { authContext } from "../auth";

export function Login() {
    const [user, setUser] = useContext(authContext)

    const login = () => {
        setUser({ id: '1234' })
    }
    return (
        <div className="login">
        <div className="header">
            <div className="title">
                Pokémon Go Touch Grass
            </div>
            <div>You are {JSON.stringify(user, null, 2)}</div>
        </div>
        <div className="login-main">
            <div className="login-left">
                <div className="font-georgia-login">
                    Login
                </div>
                <div className="font-georgia-body">
                    Username
                    <br></br>
                    <TextField
                        required
                        id="username"
                        className="input-width"
                        />
                    <br></br><br></br>
                    Password
                    <br></br>
                    <TextField
                        required
                        id="username"
                        className="input-width"
                        />
                    <br></br><br></br>
                    <div className="create-account-link">
                        <div>
                            <CreateAccountModal>
                            </CreateAccountModal>
                        </div>
                        <div>
                            <Button className="sign-in"
                                onClick={() => {
                                    alert('clicked');
                                    login()
                                }}
                                >
                                Sign In
                            </Button>
                            
                        </div>
                    
                    </div>
                </div>
            </div>
            <div className="gible-hi">
                <img className="welcome" src={welcome} alt="welcome" />
                <img className="gible" src={gible} alt="gible" />
            </div>
        </div>
    </div>
    )
}