import React, { Fragment } from "react";
import Head from "next/head";

import AllPosts from "../../components/posts/all-posts.component";
import { getAllPosts } from "../../lib/posts-util";

const AllPostsPage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta name="description" content="A list of all programming-related tutorials and posts."/>
            </Head>
            <AllPosts posts={props.posts} />
        </Fragment>
    )
}

export const getStaticProps = () => {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts
        }
    }
}

export default AllPostsPage;