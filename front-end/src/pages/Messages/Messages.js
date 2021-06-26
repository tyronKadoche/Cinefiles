import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Grid, TextField, Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    conversationWrapper: {
        height: "85vh",
        overflowY: "scroll",

    },
    avatar: {
        width: "3rem",
        height: "3rem",
        border: "2px solid #2b353e",
    },
    messages: {
        margin: "1rem",
        background: "#cee4e6",
        maxWidth: "45%",
        color: "#2b353e",
        height: "fit-content",
        width: "fit-content",
        borderRadius: "8px",
        marginRight: "auto",
        display: "flex",
    },
    myMessages: {
        margin: "1rem",
        background: "#2b353e",
        maxWidth: "45%",
        color: "#cee4e6",
        height: "fit-content",
        width: "fit-content",
        borderRadius: "8px",
        marginLeft: "auto",
        display: "flex",
    },
    text: {
        padding: "0 0.5rem",
        margin: "0.5rem 0",
    },
    sendedMessage: {
        margin: "0 1rem 0 4rem",
        width: 500,
    },
    textField: {
        width: "95%",
        margin: "0 1rem",
    },
    textFieldButtonWrapper: {
        marginTop: "1rem"
    },
    textFieldButton: {
        color: "#2b353e",
        width: "8rem",
        border: "none",
        height: "1.5rem",
        margin: "auto auto 2rem auto",
        display: "flex",
        borderRadius: "12px",
        backgroundColor: "#cee4e6",
        marginLeft: 0,
    },
}));

export default function Messages({ actualConversation }) {
    const classes = useStyles();
    const token = localStorage.token;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const chatId = window.location.search.slice(8);

    const [userData, setUserData] = useState(null);
    const [conversation, setConversation] = useState(actualConversation);
    const [comment, setComment] = useState("");

    useEffect(() => {
        getUserData();
    }, [])

    function getUserData() {
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user`, config)
            .then(function (res) {
                setUserData(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function postMessage() {
        axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/messages`, {
            text: comment,
            destUserId: conversation.destUserId,
            chatId: chatId,
        }, config)
            .then(function (res) {
                setConversation(res.data)
                setComment('')
            })
            .catch(function (error) {
                console.log("error => ", error);
            });
    }

    return (
        <>
            {
                userData &&
                <Grid container>
                    <Grid item xs={12} lg={12} className={classes.conversationWrapper}>
                        {
                            conversation.messages?.map((message) =>
                                <div className={message.userId === userData.userId ? classes.myMessages : classes.messages}>
                                    <p className={classes.text}>{message.text}</p>
                                </div>
                            )
                        }
                    </Grid>
                    <Grid container item xs={12} lg={12} direction="row">
                        <Grid item xs={9} lg={9}>
                            <TextField
                                className={classes.textField}
                                id="standard-basic"
                                label="message..."
                                type='text'
                                value={comment}
                                multiline
                                rows={4}
                                onChange={(event) => setComment(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3} lg={3} className={classes.textFieldButtonWrapper}>
                            <Button className={classes.textFieldButton} onClick={() => postMessage()} disabled={comment.length === 0}>Partager</Button>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}