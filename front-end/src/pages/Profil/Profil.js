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
        transform: "translate(20px, -50px)",
    },
    banner: {
        width: "100%",
        height: "12rem",
    },
    infos: {
        marginTop: "-4rem",
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
        width: 400,
        display: "flex",
        margin: "8rem auto",
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
        // transform: "translate(70px, 70px)",
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
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    function getUserData() {
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user`, config)
            .then(function (res) {
              setPseudo(res.data.pseudo);
              setProfilePic(res.data.profilePic);
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
            setPseudo(res.data.pseudo);
            setProfilePic(res.data.profilePic);
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
                            label="Pseudo"
                            className={classes.userInput}
                            type='text'
                            value={pseudo}
                            onChange={(event) => setPseudo(event.target.value)}
                        />
                        <TextField
                            label="Profile picture"
                            className={classes.userInput}
                            type='file'
                            accept="image/*"
                            value={profilePic}
                            onChange={(event) => setProfilePic(event.target.value)}
                        />
                        <TextField
                            label="Background picture"
                            className={classes.userInput}
                            type='file'
                            accept="image/*"
                            value={backgroundPic}
                            onChange={(event) => setBackgroundPic(event.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="Birth"
                            className={classes.userInput}
                            type='date'
                            value={birth}
                            onChange={(event) => setBirth(event.target.value)}
                        />
                        <TextField
                            label="Description"
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

                    {/* <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera className={classes.iconEditBackgroundPic} />
                    </IconButton>

                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera className={classes.iconEditProfilePic} />
                    </IconButton> */}
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
                <Grid item xs={12} lg={12} className={classes.wrapper} container>

                    <img alt="noImg" src={defaultBanner} className={classes.banner}/>
                    <Avatar alt="Tyron" src="/test" className={classes.avatar} />

                    <Grid item xs={12} lg={12} className={classes.infos} container>
                        <Grid item xs={12} lg={12} className={classes.pseudoWrapper} direction="row">
                            <h2>{pseudo}</h2>
                            <IconButton color="primary" onClick={() => handleModal()}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <p className={classes.description}>{description}</p>
                            <div className={classes.subInfo}>
                                <CakeIcon />
                                <p className={classes.textMargin}>né le:{birth}</p>
                                <RoomIcon />
                                <p className={classes.textMargin}>Pays:{country}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <WatchList />
                </Grid>
            </Grid>
        </div>
    )
}