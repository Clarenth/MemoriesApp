import React, { useState, useEffect } from "react";
import useStyles from './appStyles'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/navbar.js';
import Home from './components/Home/home.js';
import Auth from './components/Auth/auth.js'
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(sessionStorage.getItem('profile'));

    return(
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts"/>} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts"/>)} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;