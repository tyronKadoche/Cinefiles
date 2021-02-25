import React from 'react';
import { TextField, makeStyles, Button, Grid } from '@material-ui/core';
import "./home.css"

const useStyles = makeStyles((theme) => ({
    textFieldBox: {
        width: '100%',
    },
    textFieldButton: {
        backgroundColor: "#2f3233",
        display: "flex",
        float: "right",
        marginTop: "1rem",
        borderRadius: "12px",
        color: "#ffffff"
    },
    borderRight: {
        borderRight: "1px solid #2f3233",
        paddingRight: "1rem",
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} md={5} lg={5} className={classes.borderRight}>
                <Grid item xs={12}>
                    <TextField
                    className={classes.textFieldBox}
                    label="Exprimez vous !"
                    multiline
                    rows={6}
                />
                </Grid>
                <Button className={classes.textFieldButton}>Partager</Button>
            </Grid>
            <Grid item xs={12} lg={5}>

            </Grid>
        </Grid>
    )
}