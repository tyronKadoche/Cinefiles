import React, { useState } from 'react';
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
        color: "#2f3233",
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


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
                />
            </FormControl>
            <Button className={classes.formularValidationButton} onClick={() => history.push('/acceuil')} disabled={email.length !== 0 && password.length !== 0 ? false : true}>Valider</Button>
            <p className={classes.signUpText} onClick={() => history.push('/sign-up')}>s'inscrire</p>
        </div>
    );
}