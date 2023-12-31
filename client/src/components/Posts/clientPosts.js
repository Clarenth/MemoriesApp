import React, { Fragment } from 'react';
import Post from './Post/post.js';
import { useSelector } from 'react-redux';

import useStyles from './postsStyles.js';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({ setCurrentId }) => {
    const { posts } = useSelector((actionState) => actionState.reducersPosts);
    const classes = useStyles();

    console.log(posts);

    return(
        !posts?.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;