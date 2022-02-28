import React, { Fragment } from "react";

import Hero from "../components/home-page/hero.component";
import FeaturedPosts from '../components/home-page/featured-posts.component';

import { getFeaturedPosts } from '../lib/posts-util';

const HomePage = (props) => {
    return (
        <Fragment>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    );
}

export const getStaticProps = () => {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        }
    }
}

export default HomePage;