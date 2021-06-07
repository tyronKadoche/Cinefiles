import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardMedia, CardActions, CardActionArea, CircularProgress, IconButton, Button, Modal } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { infoModal } from './modals';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(() => ({
    margin1: {
        marginTop: "1rem",
        marginBottom: "1rem"
    },
    wrapper: {
        flexGrow: 1,
        textAlign: "-webkit-center",
    },
    card: {
        maxWidth: 345,
        marginBottom: "2rem",
        color: "#ffffff",
        backgroundColor: "#2b353e",
        boxShadow: "0 0 20px 0px black",
        height: "23rem",
    },
    title: {
        maxHeight: "5rem",
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
        backgroundColor: "#2b353e",
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
    rateModalWrapper: {
        color: "#ffffff",
        height: "auto",
        margin: "30% auto",
        display: "flex",
        maxWidth: "16rem",
        minHeight: "5rem",
        backdropFilter: "blur(30px)",
        backgroundColor: "transparent",
        padding: "3rem 2rem 0rem 3rem",
        borderRadius: "8px",
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
    const myApiKey = '9f2b4da1f683c576d9af80887567e2c7'; //9f2b4da1f683c576d9af80887567e2c7
    const [moviesTable , setMoviesTable] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [actualMovie, setActualMovie] = useState({});
    const [openModal, setopenModal] = useState(false);
    const [openRateModal, setOpenRateModal] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [page, setPage] = useState(1);
    const [tmdbToken, setTmdbToken] = useState(null);
    const token = localStorage.token;


    function getMoviesList()  {
        let newMovieTable = [];

        axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${myApiKey}`)
        .then(res => {
            newMovieTable = res.data.results;
            setMoviesTable(moviesTable.concat(newMovieTable))
            setPage(page + 1);
        })
    }

    function getMyWatchlist() {
        const token = localStorage.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
        .get(
            `http://localhost:5000/cinefiles-12/europe-west1/api/user/watchlist`,
            config
            )
            .then(function (res) {
                setWatchlist(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function createSession() {
        axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${myApiKey}`)
        .then(res => {
            axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${myApiKey}`, { request_token: res.data.request_token } )
                .then(res => {
                    console.log('set 2 res = ', res)
                    return res.status
                })
                .catch(e => console.log('error = ', e.message))
        })
    }

    function rateMovie(movie, rate) {
        console.log('rate = ', rate)
        const body = {
            "value": rate
        }
        axios.post(`https://api.themoviedb.org/3/movie/${movie.id}/rating?&api_key=${myApiKey}`, body)
        .then(res => {
            if (res.status === 200) {
                getMoviesList();
            }
        })
    }

    function handleModal(movie) {
        setActualMovie(movie);
        setopenModal(!openModal)
    }

    function handleRateModal(movie) {
        setActualMovie(movie);
        setOpenRateModal(!openRateModal)
    }

    function postNotification(movie) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const body = {
            notificationStatus: `Vous avez ajouté ${movie.title} à votre watchlist`,
            notificationDate: new Date(),
        }
        axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/user/notification`, body, config)
            .then(res => {
                console.log('notification = ', res.data)
            })
    }

    function addToWatchlist(movie) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const body = {
            movieId: movie.id
        }
        axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/user/watchlist`, body, config)
        .then(res => {
            postNotification(movie)
            console.log('res.data from add to watchlist = ', res.data)
            setRefresh(true);
        })
    }

    useEffect(() => {
        if (refresh) {
            getMoviesList();
            getMyWatchlist();
            createSession();
        }
        return setRefresh(false)
    }, [refresh, moviesTable]);

    return (
        <div>
            <Modal open={openModal} onClose={() => handleModal({})}>
                {infoModal(actualMovie, classes)}
            </Modal>
            <Modal open={openRateModal} onClose={() => handleRateModal({})}>
                <div className={classes.rateModalWrapper}>
                    <Rating
                        name="customized-10"
                        value={actualMovie.vote_average}
                        max={10}
                        onChange={(event, newValue) => {
                            rateMovie(actualMovie, newValue)
                        }}
                    />
                </div>
            </Modal>
           {
           moviesTable ?
            <Grid container className={classes.margin1}>
               { moviesTable.map((movie) => !watchlist.find(movieId => movieId === movie.id) ? (
                   <Grid className={classes.wrapper} item xs={12} md={6} lg={4} spacing={2}>
                       <Card className={classes.card}>
                            <CardHeader className={classes.title} title={movie.title}/>
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
                                   <StarIcon onClick={() => handleRateModal(movie)} />
                               </IconButton>
                               <IconButton className={classes.actionIcon} aria-label="add to watchlist" onClick={() => addToWatchlist(movie)}>
                                   <AddToQueueIcon />
                               </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                    ) : ""
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