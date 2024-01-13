import React, { Fragment } from "react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";

import PostContent from "@/components/posts/post-detail/post-content.component";
import { getPostData, getPostsFiles } from "@/lib/posts-util";

const PostDetailPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps = (context: GetStaticPropsContext) => {
    const { params } = context;
    const { slug } = params ?? {};

    const postData = getPostData(slug as string);

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