interface IPost {
    title: string;
    date: string;
    author?: string;
    image: string;
    excerpt: string;
    isFeatured: boolean;
    content: string;
    slug: string;
}

interface INotification {
    title: string;
    message: string;
    status: "success" | "error" | "pending";
}

interface IContactDetail {
    email: string;
    name: string;
    message: string;
}
