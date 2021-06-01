import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { FormControl, InputAdornment, IconButton, Input, Button, makeStyles  } from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import "./login.css"


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
    },
    signUpText: {
        color: "#cee4e6",
        cursor: "pointer",
        marginTop: "0"
    }
}));



export default function Login() {
    let history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState('tyrondema@hotmail.fr');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function login() {
        const body = {
            email: email,
            password: password,
        }
        axios.post('http://localhost:5000/cinefiles-12/europe-west1/api/login', body)
            .then(function (response) {
                localStorage.setItem('token', response.data.token );
                if (response.status === 200) {
                    history.push('/acceuil')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div class="login-wrapper">
            <h1 class="login-title">CONNEXION</h1>
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
                    onKeyPress={(event) => {
                        if (event.charCode === 13) login()
                    }}
                />
            </FormControl>
            <Button
                className={classes.formularValidationButton}
                onClick={() => login()}
                disabled={email.length !== 0 && password.length !== 0 ? false : true}
            >Valider</Button>
            <p className={classes.signUpText} onClick={() => history.push('/sign-up')}>s'inscrire</p>
        </div>
    );
}