import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/actionsPosts';

import useStyles from './stylesPagination';

const Paginate = ({ page }) => {
    const classes = useStyles();
    
    const { numOfPages } = useSelector((actionState) => actionState.getPosts)
    console.log(numOfPages)
    const dispatch = useDispatch();

    useEffect(() => {
        if(page) dispatch(getPosts(page));
    }, [page]);

    return (
        <Pagination 
            classes = {{ ul: classes.ul }}
            count = {numOfPages}
            page = {Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;