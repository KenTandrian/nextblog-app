import React, { Fragment } from "react";
import Head from "next/head";

import Hero from "../components/home-page/hero.component";
import FeaturedPosts from '../components/home-page/featured-posts.component';

import { getFeaturedPosts } from '../lib/posts-util';

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Ken&apos;s Blog</title>
                <meta name="description" content="I post about programming and web development"/>
            </Head>
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