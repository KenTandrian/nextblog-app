import React from "react";

// COMPONENT IMPORTS
import PostsGrid from "../posts/posts-grid.component";

// STYLE IMPORT
import classes from './featured-posts.module.css';

// COMPONENT
const FeaturedPosts = (props: { posts: IPost[] }) => {
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            <PostsGrid posts={props.posts} />
        </section>
    )
}

export default FeaturedPosts;