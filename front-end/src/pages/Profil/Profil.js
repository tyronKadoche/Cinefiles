import React, {useEffect, useState} from 'react';
import { Grid, makeStyles, Avatar, IconButton, Modal, FormControl, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import "./profile.css"
import defaultBanner from "../../assets/img/maxresdefault.jpg"
import CakeIcon from '@material-ui/icons/Cake';
import RoomIcon from '@material-ui/icons/Room';
import EditIcon from '@material-ui/icons/Edit';
import { WatchList } from "../../pages/"
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderRadius: "8px",
        height: "100%",
    },
    avatar: {
        width: "8rem",
        height: "8rem",
        border: "2px solid #2b353e",
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
    description: {
    },
    subInfo: {
        color: "#2b353e",
        display: "flex",
    },
    textMargin: {
        margin: "0.2rem 0.5rem 0rem 0rem",
    },
    modalWrapper: {
        backgroundColor: "rgb(255, 255, 255)",
        height: "auto",
        borderRadius: 8,
        width: 300,
        display: "flex",
        margin: "10rem auto",
        textAlign: "center",
        flexDirection: "column",
        padding: "1rem",
        alignItems: "center",
    },
    formularValidationButton: {
        backgroundColor: "#cee4e6",
        color: "#2b353e",
        border: "none",
        marginTop: "2rem",
        borderRadius: "12px",
        height: "1.5rem",
        width: "6rem",
    },
    userInputWrapper: {
        display: "flex",
    },
    userInput: {
        marginTop: "1rem",
        color: '#000',
        width: '100%',
    },
    iconEditBackgroundPic: {
        color: "#cee4e6",
    },
    iconEditProfilePic: {
        color: "#2b353e",
        transform: "translate(70px, 70px)",
    },
    pseudoWrapper: {
        display: "flex",
        flexDirection: "row",
    }
}));

export default function Profil() {

    const token = localStorage.token;
    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false);

    const [pseudo, setPseudo] = useState("");
    const [backgroundPic, setBackgroundPic] = useState("");
    const [birth, setBirth] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    function getUserData() {
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user`, config)
            .then(function (res) {
              console.log("user data res = ", res);
              setPseudo(res.data.pseudo);
              setBackgroundPic(res.data.backgroundPic);
              setBirth(res.data.birth);
              setCountry(res.data.country);
              setDescription(res.data.description);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserData();
    }, [])

    function handleModal() {
        setOpenModal(!openModal);
    }

    //VERIFIER LE CONFIRM PASSWORD PAR RAPPORT AU PASSWORD

    function putUserData() {
      const body = {
        pseudo,
        backgroundPic,
        profilePic,
        birth,
        country,
        description,
        password,
      };

      axios
        .post(`http://localhost:5000/cinefiles-12/europe-west1/api/user`, body, config)
        .then(function (res) {
            console.log('res = ', res)
          setPseudo(res.data.pseudo);
          setBackgroundPic(res.data.backgroundPic);
          setBirth(res.data.birth);
          setCountry(res.data.country);
          setDescription(res.data.description);
          setPassword(res.data.password);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
        <div>
            <Modal open={openModal} onClose={() => handleModal()}>
                <div className={classes.modalWrapper}>
                    <h1>Éditez vos informations:</h1>
                    <FormControl className={classes.userInputWrapper}>
                        <TextField
                            id="standard-basic"
                            label="pseudo"
                            className={classes.userInput}
                            type='text'
                            value={pseudo}
                            onChange={(event) => setPseudo(event.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="birth"
                            className={classes.userInput}
                            type='date'
                            value={birth}
                            onChange={(event) => setBirth(event.target.value)}
                        />
                        <TextField
                            label="description"
                            rows={4}
                            multiline
                            className={classes.userInput}
                            type='text'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <TextField
                            label="Country"
                            className={classes.userInput}
                            type='text'
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                        />
                    </FormControl>

                    <Button className={classes.formularValidationButton} onClick={() => {
                            handleModal();
                            putUserData();
                        }}
                    >
                        Valider
                    </Button>
                </div>
            </Modal>
            <Grid container>
                <Grid item xs={12} className={classes.wrapper}>
                    <img alt="noImg" src={defaultBanner} className={classes.banner}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera className={classes.iconEditBackgroundPic} />
                    </IconButton>
                    <Avatar alt="Tyron" src="/test" className={classes.avatar} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera className={classes.iconEditProfilePic} />
                    </IconButton>
                    <div className={classes.infos}>
                        <div className={classes.pseudoWrapper}>
                            <h2>{pseudo}</h2>
                            <IconButton color="primary" onClick={() => handleModal()}>
                                <EditIcon />
                            </IconButton>
                        </div>
                        <p className={classes.description}>{description}</p>
                        <div className={classes.subInfo}>
                            <CakeIcon />
                            <p className={classes.textMargin}>né le:{birth}</p>
                            <RoomIcon />
                            <p className={classes.textMargin}>Pays:{country}</p>
                        </div>
                        <Grid container>
                            <WatchList />
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}