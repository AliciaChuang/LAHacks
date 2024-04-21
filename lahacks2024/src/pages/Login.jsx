//import { Link } from "react-router-dom"
import CreateAccountModal from "../Components/CreateAccountModal"
import "./Login.scss"
import gible from '../Assets/gible.png';
import TextField from '@mui/material/TextField';
import React, { useContext, useState } from 'react'; //useCallback
import Button from 'react-bootstrap/Button';
import { authContext } from "../auth";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [user, setUser] = useContext(authContext)

    function validate_login(credentials) {
        // call validate api
        const valid_login = 1 // replace with validate api
        if (valid_login){
            setUser(credentials.user_id)
            return true;
        }
        else{
            return false
        }
    }
    const navigate = useNavigate();

    // Login variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login">
        <div className="header">
            <div className="title">
                Pokémon Go Touch Grass
            </div>
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
                        onChange={(e) => {setUsername(e.target.value)}}
                        />
                    <br></br><br></br>
                    Password
                    <br></br>
                    <TextField
                        required
                        id="password"
                        className="input-width"
                        onChange={(e) => {setPassword(e.target.value)}}
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
                                    console.log({"user_id":username, "password":password});
                                    const valid_login = validate_login({"user_id":username, "password":password});
                                    console.log("credential validation results")
                                    console.log(valid_login)
                                    if (valid_login) {
                                        navigate("./home")
                                    }
                                    else {
                                        alert("Invalid credentials")
                                    }
                                }}
                                >
                                Sign In
                            </Button>
                            
                        </div>
                    
                    </div>
                </div>
            </div>
            <div className="gible-hi">
                <img className="gible" src={gible} alt="gible" />
            </div>
        </div>
    </div>
    )
}