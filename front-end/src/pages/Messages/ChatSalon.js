import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles, Grid, TextField, Avatar, Button } from '@material-ui/core';
import Messages from './Messages';

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

export default function ChatSalon() {
    let history = useHistory();
    const classes = useStyles();
    const token = localStorage.token;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const chatId = window.location.search.slice(8);
    const [conversation, setConversation] = useState();
    const [actualConversation, setActualConversation] = useState(null);


    useEffect(() => {
        getChats();
    }, [])

    function getChats() {
        axios.get("http://localhost:5000/cinefiles-12/europe-west1/api/user/chats", config)
            .then(function (res) {
                console.log('getChats = ', res.data)
                setConversation(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleConversation(conversation) {
        history.push(`/chats?chatId=${conversation.docId}`)
        console.log('setAdcutalConeojbhfsd = ', conversation)
        setActualConversation(conversation.messages)
    }

    return (
        <Grid container>
            <Grid item xs={3} lg={3}>
                {
                    conversation?.map((conversation, key) =>
                        <div key={key} onClick={() => handleConversation(conversation)}>
                            <Avatar alt="message" src={conversation.destPic ? conversation.destPic : ""} className={classes.avatar}></Avatar>
                            <p>{conversation.destName}</p>
                        </div>
                    )
                }
            </Grid>
            {
                actualConversation &&
                <Grid item xs={9} lg={9}>
                    <Messages actualConversation={actualConversation} />
                </Grid>
            }
        </Grid>
    )
}