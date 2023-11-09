import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getPosts, getPostsBySearch } from '../../actions/actionsPosts.js';
import Posts from '../Posts/clientPosts';
import Form from '../Form/form.js';
import Pagination from '../Pagination/Pagination.jsx';

import useStyles from './stylesHome.js';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

//use with react-router-dom URL search parameters
//use as a hook
function useQuery() {
    return new URLSearchParams(useLocation().searchUserPosts);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1; //reads the URL to see if there is a page param then populates the variable
    const searchQuery = query.get('searchQuery');
    const [searchUserPosts, setSearchUserPosts] = useState('');
    const [tags, setTags] = useState([]);
    const classes = useStyles();

    /*
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    */

    const searchForUserPosts = () => {
        if(searchUserPosts.trim() || tags) {
            dispatch(getPostsBySearch({ searchUserPosts, tags: tags.join(',') } ) );
            history.push(`/posts/search?searchQuery=${searchUserPosts || 'none'}&tags=${tags.join(',')} `);
        } else {
            history.push('/');
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchForUserPosts();
        }
    };

    //handleAdd is working with a State Array. Spread the previous state before changing anything
    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <div>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                    name="search" 
                                    variant="outlined" 
                                    label="Search Memories" 
                                    fullWidth
                                    value={searchUserPosts} 
                                    onKeyPress={handleKeyPress}
                                    onChange={(e) => setSearchUserPosts(e.target.value)}
                                />
                                <ChipInput 
                                    label="Search Tags"
                                    variant="outlined"
                                    style={{margin: '10px 0'}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                />
                                <Button onClick={searchForUserPosts} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <Paper elevation={6}>
                                <Pagination page={page}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home
