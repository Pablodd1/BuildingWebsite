import { getBlogBySlug } from 'lib/blogService';

export function generateMetadata({ params }) {
    const blog = getBlogBySlug(params.slug);
    
    if (!blog) {
        return {
            title: 'Blog No Encontrado | Building Innovation',
        };
    }

    return {
        title: `${blog.title} | Building Innovation`,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            images: [blog.image],
        }
    };
}

export default function BlogPostLayout({ children }) {
    return <>{children}</>;
}
