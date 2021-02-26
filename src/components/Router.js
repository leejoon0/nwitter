import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from 'routes/Home';
import Navigtion from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigtion />}
            <Switch>
                {isLoggedIn ? 
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Redirect from='*' to='/' />
                    </> : 
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from='*' to='/' />
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;