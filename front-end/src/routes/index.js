import HomeIcon from '@material-ui/icons/Home';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Home, Explorer, Notifications, ChatSalon, Profil } from "../pages/index";

const routes = [
    {
        id: 0,
        name: "Accueil",
        icon: <HomeIcon/>,
        route: "/acceuil",
        component: <Home/>,
    },
    {
        id: 1,
        name: "Explorer",
        icon: <LocalMoviesIcon />,
        route: "/explorer",
        component: <Explorer/>,
    },
    {
        id: 2,
        name: "Notifications",
        icon: <NotificationsIcon />,
        route: "/notification",
        component: <Notifications />,
    },
    {
        id: 3,
        name: "Chats",
        icon: <EmailIcon />,
        route: "/chats",
        component: <ChatSalon />,
    },
    {
        id: 4,
        name: "Profile",
        icon: <AccountCircleIcon />,
        route: "/profile",
        component: <Profil />,
    },
];

export {routes}