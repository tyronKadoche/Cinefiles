import HomeIcon from '@material-ui/icons/Home';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Home, Explorer, Notifications, Messages, WatchList, Profil } from "../pages/index";

const routes = [
    {
        id: 0,
        name: "Acceuil",
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
        name: "Message",
        icon: <EmailIcon />,
        route: "/message",
        component: <Messages />,
    },
    {
        id: 4,
        name: "Watch list",
        icon: <SubscriptionsIcon />,
        route: "/watch-list",
        component: <WatchList />,
    },
    {
        id: 5,
        name: "Profile",
        icon: <AccountCircleIcon />,
        route: "/profile",
        component: <Profil />,
    },
];

export {routes}