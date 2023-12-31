import React from 'react';
import useStyles from './postStyles.js';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/actionsPosts.js';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(sessionStorage.getItem('profile'));

    const Likes = () => {
        /**Liking a post logic */
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    return(
        <Card className={classes.card} raised elevation={6}>
            {/*Image upload render */}
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
            </div>

            {/* Edit Button render */}
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            
            {/*tags render*/}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            
            {/**title render */}
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title }</Typography>
            
            <CardContent>
                {/**post title render */}
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                {/**like render */}
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>

                {/**Delete render */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;