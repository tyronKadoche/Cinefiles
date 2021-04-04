import React from 'react';
import Sidebar from './Sidebar';
import { routes } from "../routes"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from '@material-ui/core/';
import "./GlobalLayout.css"

export default function GlobalLayout() {
    return (
        <Grid class="global-layout-wrapper" container >
            <Router>
                <Grid item xs={3} lg={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9} lg={10}>
                    <div>
                        <Switch>
                            {routes.map((element) => (
                                <Route path={element.route}>
                                    {element.component}
                                </Route>
                            ))}
                        </Switch>
                    </div>
                </Grid>
            </Router >
        </Grid>
    )
}

