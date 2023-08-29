import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => {
    return fs.readdirSync(postDirectory);
}

export const getPostData = (postIdentifier: string) => { // postIdentifier can be filename or slug only
    const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension
    const filePath = path.join(postDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent); // return data (metadata) as JS object, and MD as string

    const postData = {
        slug: postSlug,
        ...data,
        content: content
    } as IPost;

    return postData;
}

export const getAllPosts = () => {
    const postFiles = getPostsFiles(); // returns an array of string

    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile);
    });

    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
    return sortedPosts;
}

export const getFeaturedPosts = () => {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter(post => post.isFeatured);
    return featuredPosts;
}