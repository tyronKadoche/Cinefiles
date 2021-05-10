import React from 'react';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import { Grid, makeStyles, Avatar, ListItemIcon, IconButton, Modal, FormControl, TextField, Button } from '@material-ui/core';

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
    }
}));

export default function WatchList() {
    const classes = useStyles();

    return (
        <div className={classes.title}>
            <ListItemIcon >
                <SubscriptionsIcon className={classes.titleIcon}/>
            </ListItemIcon>
            <h1>WATCH LIST</h1>
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