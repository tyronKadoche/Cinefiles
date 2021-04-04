import React, {useEffect, useState} from 'react';
import { Grid, makeStyles, Avatar } from '@material-ui/core';
import axios from 'axios';
import "./profile.css"
import defaultBanner from "../../assets/img/maxresdefault.jpg"
import CakeIcon from '@material-ui/icons/Cake';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderRadius: "8px",
        height: "100%",
    },
    avatar: {
        width: "8rem",
        height: "8rem",
        border: "2px solid #2f3233",
        transform: "translate(20px, -75px)",
        position: "absolute",
    },
    banner: {
        width: "100%",
        height: "12rem",
    },
    infos: {
        marginTop: "3.5rem",
        marginLeft: "2rem",
    },
    subInfo: {
        color: "#2f3233",
        display: "flex",
    },
    textMargin: {
        margin: "0.2rem 0.5rem 0rem 0rem",
    },
}));

export default function Profil() {

    const token = localStorage.getItem('token');
    const classes = useStyles();

    const [userData, setUserData] = useState({});
    const [moviesTable, setMoviesTable] = useState(null);

    function getUserData() {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user`, config)
            .then(function (res) {
                setUserData(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserData();
    })

    console.log('userData.token = ', userData.token)

    return (
        <div>
            <Grid container>
                <Grid item xs={7} className={classes.wrapper}>
                    <img alt="noImg" src={defaultBanner} className={classes.banner}/>
                    <Avatar alt="Tyron" src="/test" className={classes.avatar}/>
                    <div className={classes.infos}>
                        <h2>Pseudo</h2>
                        <p>Description</p>
                        <div className={classes.subInfo}>
                            <CakeIcon />
                            <p className={classes.textMargin}>né le:</p>
                            <RoomIcon />
                            <p className={classes.textMargin}>Pays</p>
                        </div>
                        <Grid container>
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
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}