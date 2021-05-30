import React, { useState, useEffect } from 'react';
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
    const chatId = window.location.search.slice(8);
    console.log(chatId)
    const [conversation, setConversation] = useState();
    const [actualConversation, setActualConversation] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        getConversation();
    }, [])
    console.log(chatId)
    function postMessage() {
        axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/messages`, {
            text: comment,
            userId: conversation.destUserId,
            chatId
        },
        config)
            .then(function (res) {
                setConversation(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getConversation() {
        axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/chats`, {
            chatId,
        }, config)
            .then(function (res) {
                setConversation(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    console.log("conversation", conversation)
    return (
        <Grid container>
            <Grid item xs={3}>
                {/* {
                    conversation.map((conversation) => {
                    })
                } */}
            </Grid>
            <Grid item xs={9}>
                {
                    conversation?.messages?.map((message) =>
                        <>
                            {/* <Avatar alt="message" src={messages.avatar} className={classes.avatar} /> */}
                            <p>{message}</p>
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