import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea, CircularProgress, IconButton, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


function infoModal(movie, classes) {
    return (
        <div className={classes.modalCardWrapper}>
            <Card className={classes.modal}>
                <CardContent className={classes.details}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>language: {movie.original_language}</p>
                    <p>realease date: {movie.release_date}</p>
                    <p>vote: {movie.vote_count}</p>
                    <Rating name="customized-10" readOnly max={10} defaultValue={movie.vote_average} precision={0.5} />
               </CardContent>
                <CardMedia
                    className={classes.cover}
                    image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    onClick={null}
                />
            </Card>
        </div>
    )
}

function rateModal(movie) {
    <Grid container>
        <Rating name="customized-10" defaultValue={2} max={10} />
    </Grid>
}

export { infoModal, rateModal };