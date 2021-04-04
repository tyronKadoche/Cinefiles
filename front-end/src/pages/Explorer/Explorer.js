import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardMedia, CardActions, CardActionArea, CircularProgress, IconButton, Button, Modal } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import {infoModal} from './modals';

const useStyles = makeStyles(() => ({
    margin1: {
        margin: "1rem",
    },
    wrapper: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 345,
        marginBottom: "2rem",
        color: "#ffffff",
        backgroundColor: "#2f3233",
        boxShadow: "0 0 20px 0px black",
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    actionIcon: {
        justifyContent: "flex-end",
        color: "#ffffff"
    },
    loadMoreButtonWrapper: {
        textAlignLast: "center",
    },
    loadMoreButton: {
        color: "#cee4e6",
        backgroundColor: "#2f3233",
        border: "none",
        marginTop: "2rem",
        borderRadius: "12px",
        height: "1.5rem",
        width: "auto",
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
}));

export default function Explorer() {
    const classes = useStyles();
    const myApiKey = 'c0312d6e4f0a54c83d85d753e88182ce'; //9f2b4da1f683c576d9af80887567e2c7
    const [moviesTable , setMoviesTable] = useState([]);
    const [actualMovie, setActualMovie] = useState({});
    const [openModal, setopenModal] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getMoviesList();
    }, []);

    function getMoviesList() {
        let newMovieTable = [];

        axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${myApiKey}`)
        .then(res => {
            newMovieTable = res.data.results;
            setMoviesTable(moviesTable.concat(newMovieTable))
            setPage(page + 1);
            console.log('moviesTable = ', moviesTable)
        })
    }

    function handleModal(movie) {
        setActualMovie(movie);
        setopenModal(!openModal)
    }

    return (
        <div>
            <h1>EXPLORER</h1>
            <Modal open={openModal} onClose={() => handleModal({})}>
                {infoModal(actualMovie, classes)}
            </Modal>
           {
           moviesTable ?
                    <Grid container className={classes.margin1}>
               { moviesTable.map((movie) => (
                   <Grid className={classes.wrapper} item xs={12} md={6} lg={4} spacing={2}>
                       <Card className={classes.card}>
                            <CardHeader title={movie.title}/>
                           <CardActionArea onClick={() => handleModal(movie)}>
                                <CardMedia
                                className={classes.media}
                                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                onClick={null}
                                />
                            </CardActionArea>
                           <CardActions disableSpacing>
                               <h3>note: {movie.vote_average}</h3>
                               <IconButton className={classes.actionIcon} aria-label="add to favorites">
                                   <FavoriteIcon />
                               </IconButton>
                               <IconButton className={classes.actionIcon} aria-label="rated">
                                   <StarIcon />
                               </IconButton>
                               <IconButton className={classes.actionIcon} aria-label="add to watchlist">
                                   <AddToQueueIcon />
                               </IconButton>
                           </CardActions>
                        </Card>
                    </Grid>
                    )
                )}
                <Grid item xs={12} className={classes.loadMoreButtonWrapper}>
                    <Button className={classes.loadMoreButton} onClick={() => getMoviesList()}>Plus de films / séries</Button>
                </Grid>
            </Grid>
            :
            <div>
                <CircularProgress />
            </div>
            }
        </div>
    )
}