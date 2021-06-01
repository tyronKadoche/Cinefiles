import React, { useEffect, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Modal, Button } from '@material-ui/core';
import { infoModal } from '../pages/Explorer/modals';

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
    },
    root: {
        display: 'flex',
    },
    content: {
        flex: '1 0 auto',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    card: {
        maxWidth: 345,
        marginBottom: "2rem",
        color: "#ffffff",
        backgroundColor: "#2b353e",
        boxShadow: "0 0 20px 0px black",
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    moreButtonWrapper: {
        textAlignLast: "center",
    },
    moreButton: {
        color: "#cee4e6",
        backgroundColor: "#2b353e",
        border: "none",
        marginTop: "2rem",
        borderRadius: "12px",
        height: "1.5rem",
        width: "15rem",
    },
    modalCardWrapper: {
        width: "50rem",
        marginTop: "10%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "transparent",
        border: "none",
    },
    modal: {
        maxWidth: "50rem",
        height: "auto",
        minHeight: "20rem",
        display: "flex",
        color: "#ffffff",
        backgroundColor: "transparent",
        backdropFilter: "blur(30px)"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: "18rem"
    },
    cover: {
        width: "32rem",
        backgroundImage: "cover"
    },
    trend: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "auto",
        marginRight: "auto",
    },
}))

export default function Trend() {
    const classes = useStyles();
    const myApiKey = 'c0312d6e4f0a54c83d85d753e88182ce';
    const [trendTable, setTrendTable] = useState([]);
    const [actualMovie, setActualMovie] = useState({});
    const [openModal, setopenModal] = useState(false);

    useEffect(() => {
        getTrendList();
    }, []);

    function handleModal(movie) {
        setActualMovie(movie);
        setopenModal(!openModal)
    }

    function getTrendList() {
        axios.get(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=${myApiKey}`)
            .then(res => {
                setTrendTable(res.data.results);
            })
            .catch((error) => {
                console.log('error = ', console.error)
            })
    }

    return (
        <div className={classes.trend}>
            <Modal open={openModal} onClose={() => handleModal({})}>
                {infoModal(actualMovie, classes)}
            </Modal>
            <h1 className={classes.title}>Tendances</h1>
            { trendTable.slice(0, 5).map((movie, index) => (
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {movie.original_title}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                {`#${index + 1}`}
                             </Typography>
                             <div className={classes.moreButtonWrapper}>
                                <Button className={classes.moreButton} onClick={() => handleModal(movie)}>Plus d'info</Button>
                             </div>
                        </CardContent>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image="/static/images/cards/live-from-space.jpg"
                        title="Live from space album cover"
                    />
                </Card>
                )
            )}
        </div>
    )
}