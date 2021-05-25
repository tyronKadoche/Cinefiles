import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, Grid, TextField, Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: "3rem",
        height: "3rem",
        border: "2px solid #2b353e",
    },
    messages: {

    },
    sendedMessage: {
        position: "absolute",
        bottom: 20,
        margin: "0 1rem 0 4rem",
        width: 500,
    },
    textFieldButton: {

    },
}));

export default function Messages() {
    const classes = useStyles();
    const token = localStorage.token;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const [conversation, setConversation] = useState([]);
    const [actualConversation, setActualConversation] = useState([]);
    const [comment, setComment] = useState("");

    function getConversation() {
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user/conversation`, config)
            .then(function (res) {
                // todo
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function postMessage() {
        axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/user/conversation`, config)
            .then(function (res) {
                // todo
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Grid container>
            <Grid item xs={3}>
                {
                    conversation.map((conversation) => {
                        // todo
                    })
                }
            </Grid>
            <Grid item xs={9}>
                {
                    actualConversation.map((messages) =>
                        <>
                            <Avatar alt="message" src={messages.avatar} className={classes.avatar} />
                            <p>{messages.content}</p>
                        </>
                    )
                }
                <TextField
                    id="standard-basic"
                    label="message..."
                    className={classes.sendedMessage}
                    type='text'
                    value={comment}
                    multiline
                    rows={4}
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button className={classes.textFieldButton} onClick={() => postMessage()} disabled={comment.length === 0}>Partager</Button>
            </Grid>
        </Grid>
    )
}