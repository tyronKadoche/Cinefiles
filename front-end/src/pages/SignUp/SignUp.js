import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { FormControl, InputAdornment, IconButton, Input, Button, makeStyles } from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import "../Login/login.css"


const useStyles = makeStyles((theme) => ({
    loginInput: {
        color: '#ffffff',
        width: '100%',
    },
    iconAdornment: {
        color: '#ffffff',
    },
    formularValidationButton: {
        backgroundColor: "#cee4e6",
        color: "#2b353e",
        border: "none",
        marginTop: "2rem",
        borderRadius: "12px",
        height: "1.5rem",
        width: "6rem",
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let history = useHistory();

    function register() {
        const body = {
            "email": email,
            "password": password
        }
        axios.post('http://localhost:5000/cinefiles-12/europe-west1/api/register', body)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    history.push('/login');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div class="login-wrapper">
            <h1 class="login-title">INSCRIPTION</h1>
            <FormControl class="formular-wrapper">
                <Input
                    className={classes.loginInput}
                    id="standard-adornment-password"
                    type='text'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormControl>
            <FormControl class="formular-wrapper">
                <Input
                    className={classes.loginInput}
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                className={classes.iconAdornment}
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl class="formular-wrapper">
                <Input
                    className={classes.loginInput}
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password2}
                    onChange={(event) => setPassword2(event.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                className={classes.iconAdornment}
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button className={classes.formularValidationButton}
                    onClick={() => register()}
                    disabled={email.length !== 0 && password.length !== 0  && password === password2 ? false : true}
            >S'inscrire</Button>
        </div>
    );
}