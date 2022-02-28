import React from "react";

import PostContent from "../../components/posts/post-detail/post-content.component";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

const PostDetailPage = (props) => {
    return <PostContent post={props.post} />
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