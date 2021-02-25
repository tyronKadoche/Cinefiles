import React from 'react';
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import { routes } from "../../routes"
import logo from '../../assets/img/cinefiles-logo.png'
import "./sidebar.css"
import img from '../../assets/img/sidebarimg.jpg'
// style={{ backgroundImage: `url(${img})`}}

export default function Sidebar() {
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
            </div>
    );
}