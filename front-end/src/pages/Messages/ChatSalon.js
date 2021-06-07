import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles, Grid, TextField, Avatar, Button } from '@material-ui/core';
import Messages from './Messages';

const useStyles = makeStyles((theme) => ({
    sidebar: {
        height: "100vh",
        borderRight: "1px solid #2b353e",
        backgroundColor: "#cee4e6"
    },
    roomWrapper: {
        display: "flex",
        flexDirection: "row",
        padding: "0.75rem",
        borderRadius: "8px",
        margin: "0.25rem",
        "&:hover": {
            backgroundColor: '#2b353e',
            color: "#fff",
        }
    },
    avatar: {
        width: "3rem",
        height: "3rem",
        border: "2px solid #2b353e",
    },
    pseudo: {
        marginTop: "0",
        marginLeft: "0.5rem",
        fontWeight: 700,
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
    const [conversation, setConversation] = useState();
    const [actualConversation, setActualConversation] = useState(null);


    useEffect(() => {
        getChats();
    }, [])

    function getChats() {
        axios.get("http://localhost:5000/cinefiles-12/europe-west1/api/user/chats", config)
            .then(function (res) {
                setConversation(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleConversation(conversation) {
        history.push(`/chats?chatId=${conversation.docId}`)
        console.log('setAdcutalConeojbhfsd = ', conversation)
        setActualConversation(conversation)
    }

    return (
        <Grid container>
            <Grid item xs={2} lg={2} className={classes.sidebar}>
                {
                    conversation && conversation[0] ?
                    conversation.map((conversation, key) =>
                        <div key={key} className={classes.roomWrapper} onClick={() => handleConversation(conversation)}>
                            <Avatar alt="message" src={conversation.destPic ? conversation.destPic : ""} className={classes.avatar}></Avatar>
                            <p className={classes.pseudo}>{conversation.destName}</p>
                        </div>
                    ) :
                        <h4 style={{ textAlign: "center", color: "#2b353e", marginTop: "16rem", marginBottom: "0" }}>Aucune Conversation.</h4>
                }
            </Grid>
            <Grid item xs={10} lg={10}>
                {
                    actualConversation ?
                        <Messages actualConversation={actualConversation} /> :
                    <>
                            <h4 style={{ textAlign: "center", color: "#2b353e", marginTop: "16rem", marginBottom: "0"}}>Selectionner Conversation.</h4>
                            <h4 style={{ textAlign: "center", color: "#2b353e", marginTop: "0rem"}}>Vous pouvez débuter une conversation depuis votre timeLine !</h4>
                    </>
                }
            </Grid>
        </Grid>
    )
}