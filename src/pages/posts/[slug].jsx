import React, { Fragment } from "react";
import Head from "next/head";

import PostContent from "../../components/posts/post-detail/post-content.component";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

const PostDetailPage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt}/>
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    )
}

export const getStaticProps = (context) => {
    const { params } = context;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
}

export const getStaticPaths = () => {
    const postFileNames = getPostsFiles();
    const slugs = postFileNames.map(filename => filename.replace(/\.md$/, ''));

    return {
        paths: slugs.map(slug => ({ params: { slug: slug } })),
        fallback: false
    }
}

export default PostDetailPage;