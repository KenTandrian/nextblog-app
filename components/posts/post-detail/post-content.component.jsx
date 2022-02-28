import React from "react";
import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header.component';

import classes from './post-content.module.css';

const PostContent = (props) => {
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    return (
        <article className={classes.content}>
            <PostHeader image={imagePath} title={post.title} />
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent;