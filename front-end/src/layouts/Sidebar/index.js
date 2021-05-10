import React from 'react';
import { Link } from "react-router-dom";
import { Button, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core/';
import { routes } from "../../routes"
import logo from '../../assets/img/cinefiles-logo.png'
import "./sidebar.css"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    logoutbutton: {
        backgroundColor: "#cee4e6",
        color: "#2b353e",
        border: "none",
        display: "flex",
        margin: "auto auto 2rem auto",
        borderRadius: "12px",
        height: "1.5rem",
        width: "8rem",
    },
}));

export default function Sidebar() {
    let history = useHistory();
    const classes = useStyles();

    function logout() {
        localStorage.clear();
        history.push('/login')
    }

    return (
        <div class="sidebar-wrapper">
            <img class="logo" src={logo} alt="NOIMG"/>
            <List>
                {routes.map((element) => (
                    <ListItem button key={element.id} class="button-wrapper">
                        <Link to={element.route} class="sidebar-menu-item-wrapper">
                            <ListItemIcon class="sidebar-menu-item">{element.icon}</ListItemIcon>
                            <ListItemText class="sidebar-menu-item" primary={element.name} />
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Button className={classes.logoutbutton} onClick={() => logout()}>Déconnexion</Button>
        </div>
    );
}