import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, makeStyles, Button, Grid, Avatar, Menu, MenuItem } from '@material-ui/core';
import Trend from '../../components/Trend'
import axios from 'axios';
import "./home.css"

const useStyles = makeStyles((theme) => ({
    textFieldBox: {
        width: '100%',
    },
    textFieldButton: {
        backgroundColor: "#2b353e",
        display: "flex",
        float: "right",
        margin: "1rem 0",
        marginRight: "1rem",
        borderRadius: "12px",
        color: "#ffffff",
    },
    borderRight: {
        borderRight: "1px solid #2b353e",
    },
    messageWrapper: {
        display: "flex",
        flexDirection: "row",
        padding: "0.75rem",
        borderTop: "2px solid #d5d5d5",
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
    comment: {
        marginTop: "1.5rem",
        transform: "translate(74px, -58px)",
    },
}));


export default function Home() {
    let history = useHistory();
    const classes = useStyles();
    const token = localStorage.token;
    const [postReady, setPostReady] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [userData, setUserData] = useState([]);
    const [comment, setComment] = useState("");
    const [selectUser, setSelectUSer] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = (user) => {
        setSelectUSer(user);
        postTchat(user);
    };

    function postTchat(message) {
        console.log('message = ', message)
        const body = {
            destName: message.pseudo,
            destPic: message.userPic ? message.userPic : "",
            destUserId: message.userId,
            name: userData.pseudo,
            profilePic: userData.profilePic
        }
        axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/user/chats`, body, config)
            .then(function (res) {
                if (res.status === 200) {
                    history.push(`/chats?chatId=${res.data.chatId}`)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleClose = () => {
        setOpenMenu(false)
        setSelectUSer(null);
    };

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        if (postReady) {
            axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/timeline`, config)
                .then(function (res) {
                    setTimeline(res.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return setPostReady(false)
    }, [postReady, timeline])

    function getUserData() {
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user`, config)
            .then(function (res) {
                setUserData(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function postComment() {
        const body = {
            comment: comment,
            pseudo: userData.pseudo.length > 0 ? userData.pseudo : userData.email,
            profilePic: userData.profilePic.length > 0 ? userData.profilePic : userData.email,
            createAt: new Date(),
            userId: userData.userId
        };

        axios
            .post(`http://localhost:5000/cinefiles-12/europe-west1/api/timeline`, body, config)
            .then(function (res) {
                setComment("");
                setPostReady(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Grid container >
            <Grid item xs={8} className={classes.borderRight}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                        className={classes.textFieldBox}
                        label="Exprimez vous !"
                        multiline
                        rows={6}
                        value={comment}
                        onChange={(event) => {
                            setComment(event.target.value)
                        }}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.textFieldButton} onClick={() => postComment()} disabled={comment.length === 0}>Partager</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            timeline.map((message) =>
                                <Grid item xs={12}>
                                    <div className={classes.messageWrapper}>
                                        <Avatar alt="message" src={message.userPic ? message.userPic : ""} className={classes.avatar} onClick={() => postTchat(message)}>
                                            {/* <Menu
                                                id="simple-menu"
                                                keepMounted
                                                open={openMenu}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={() => {console.log(message);postTchat(message.userId)}}>
                                                    Envoyer un message privé
                                                </MenuItem>
                                            </Menu> */}
                                        </Avatar>
                                        <p className={classes.pseudo}>{message.pseudo}</p>
                                    </div>
                                    <p className={classes.comment}>{message.comment}</p>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} className={classes.trend}>
                <Trend />
            </Grid>
        </Grid>
    )
}