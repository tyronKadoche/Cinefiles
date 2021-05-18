import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import { makeStyles, ListItemIcon, Grid, Card, CardHeader, CardActionArea, CardActions, CardMedia, IconButton    } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
    },
    title: {
        display: "flex",
        flexDirection:"row"
    },
    titleIcon: {
        width: "3rem",
        height: "3rem",
        marginTop: "1.5rem",
        color: "#000",
    },
    margin1: {
        marginTop: "1rem",
        marginBottom: "1rem"
    },
    card: {
        maxWidth: 345,
        marginBottom: "2rem",
        color: "#ffffff",
        backgroundColor: "#2b353e",
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
}));

export default function WatchList() {
    const classes = useStyles();
    const token = localStorage.token;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const [watchlist, setWatchlist] = useState([]);

    function getMyWatchlist() {
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user/watchlist`, config)
            .then(function (res) {
                res.data.map((movieId) => {
                    getMovieFromTMDB(movieId)
                })
                console.log('watchList = ', watchlist)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function getMovieFromTMDB(movieId) {
        const myApiKey = 'c0312d6e4f0a54c83d85d753e88182ce'; //9f2b4da1f683c576d9af80887567e2c7
        await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?&api_key=${myApiKey}`)
            .then(res => {
                setWatchlist(oldParam => [...oldParam, res.data])
            })
    }
    console.log('watchlist = ', watchlist)

    useEffect(() => {
        getMyWatchlist();
    }, [])

    return (
        <div className={classes.title}>
            <ListItemIcon >
                <SubscriptionsIcon className={classes.titleIcon}/>
            </ListItemIcon>
            <h1>Watchlist</h1>
            <Grid container className={classes.margin1}>
                {watchlist && watchlist.map((movie) => {
                    console.log(movie)
                    return (
                    <Grid className={classes.wrapper} item xs={12} md={6} lg={4} spacing={2}>
                        <Card className={classes.card}>
                            <CardHeader title={movie.title} />
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    onClick={null}
                                />
                            </CardActionArea>
                            <CardActions disableSpacing>
                                <h3>note: {movie.vote_average}</h3>
                                <IconButton className={classes.actionIcon} aria-label="rated">
                                    <StarIcon />
                                </IconButton>
                                <IconButton className={classes.actionIcon} aria-label="add to watchlist">
                                    <RemoveFromQueueIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                )}
                )}
            </Grid>
        </div>
    )
}

// eslint-disable-next-line no-lone-blocks
{/* {moviesTable && moviesTable.map((movie) => (
                                <Grid className={classes.wrapper} item xs={12} md={6} lg={4} spacing={2}>
                                    <Card className={classes.card}>
                                        <CardHeader title={movie.title} />
                                        <CardActionArea>
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
)} */}