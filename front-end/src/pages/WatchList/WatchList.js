import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import { makeStyles, ListItemIcon, Grid, Card, CardHeader, CardActionArea, CardActions, CardMedia, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
    },
    titleIconWrapper: {
        flexDirection: "row",
        display: "flex",
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
        width: 345,
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

export default function WatchList() {
  const classes = useStyles();
  const token = localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [watchlist, setWatchlist] = useState([]);
  const [refreshTab, setRefreshTab] = useState(true);

  function getMovieFromTMDB(movieId) {
    const myApiKey = "c0312d6e4f0a54c83d85d753e88182ce"; //9f2b4da1f683c576d9af80887567e2c7
    if (refreshTab) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${myApiKey}`
      )
      .then((res) => {
        setWatchlist((oldParam) => [...oldParam, res.data]);
      });
    }
      return setRefreshTab(false);
  }

  function getMyWatchlist() {
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
        res.data.map((movieId) => getMovieFromTMDB(movieId));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function postNotification(movie) {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const body = {
      notificationStatus: `Vous avez supprimé ${movie.title} de votre watchlist`,
      notificationDate: new Date(),
    }
    axios.post(`http://localhost:5000/cinefiles-12/europe-west1/api/user/notification`, body, config)
      .then(res => {
        console.log('notification = ', res.data)
      })
  }

  function deleteWatchlist(movie) {
    axios
      .delete(
        `http://localhost:5000/cinefiles-12/europe-west1/api/user/watchlist/${movie.id}`,
        config
      )
      .then(function (res) {
        setRefreshTab(true);
        postNotification(movie)
        console.log("Deleted element", res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (refreshTab) {
      getMyWatchlist();
      setWatchlist([])
    }
    return setRefreshTab(false)
  }, [refreshTab, watchlist]);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.titleIconWrapper}>
        <ListItemIcon>
          <SubscriptionsIcon className={classes.titleIcon} />
        </ListItemIcon>
        <h1>Watchlist</h1>
      </Grid>
      <Grid item xs={12} className={classes.margin1}>
        <Grid container>
          {
          watchlist && watchlist.map((movie) => (
              <Grid
                className={classes.wrapper}
                item
                xs={12}
                md={6}
                lg={4}
                spacing={2}
              >
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.title}
                    title={movie.title}
                  />
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      onClick={null}
                    />
                  </CardActionArea>
                  <CardActions disableSpacing>
                    <h3>note: {movie.vote_average}</h3>
                    <IconButton
                      className={classes.actionIcon}
                      aria-label="rated"
                    >
                      <StarIcon />
                    </IconButton>
                    <IconButton
                      className={classes.actionIcon}
                      aria-label="add to watchlist"
                    >
                      <RemoveFromQueueIcon
                        onClick={() => deleteWatchlist(movie)}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}