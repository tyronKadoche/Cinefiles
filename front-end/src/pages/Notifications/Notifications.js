import React, { useState, useEffect } from 'react';
import { makeStyles, Chip, Grid } from '@material-ui/core';
import Trend from '../../components/Trend'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        margin: "1rem",
    },
    title: {
        textAlign: "center",
    },
    notificationsChips: {
        color: "#cee4e6",
        backgroundColor: "#2b353e",
        marginTop: "1rem",
    },
    notification: {
        margin: "1rem",
    }
}));

export default function Notifications() {
    const classes = useStyles();
    const token = localStorage.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const [notifications, setNotification] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if (refresh) {
            getNotification();
        }
    }, [refresh])

    function getNotification() {
        axios
            .get(
                `http://localhost:5000/cinefiles-12/europe-west1/api/user/notification`,
                config
            )
            .then(function (res) {
                setNotification(res.data);
                setRefresh(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deleteNotification(notif) {
        axios
            .delete(
                `http://localhost:5000/cinefiles-12/europe-west1/api/user/notification/${notif.notificationDate}`,
                config
            )
            .then(function (res) {
                setRefresh(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>Notifications</h1>
            <Grid container direction="column" justify="space-between">
                {
                    notifications.map((notif) =>
                        <Grid item xs={12} lg={12} classes={classes.notification}>
                            <Chip label={notif.notificationStatus} onDelete={() => deleteNotification(notif)} className={classes.notificationsChips} />
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}