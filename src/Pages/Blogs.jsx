
import { Card, Typography, Button } from "@material-tailwind/react";

const Blogs = () => {
    const blogPosts = [
        {
            title: "Exploring the Chittagong Hill Tracts",
            summary: "Discover the breathtaking beauty and rich culture of the Chittagong Hill Tracts.",
            link: "#"
        },
        {
            title: "Top 10 Beaches in Bangladesh",
            summary: "From Cox's Bazar to Kuakata, explore the top beaches that Bangladesh has to offer.",
            link: "#"
        },
        {
            title: "A Cultural Tour of Dhaka",
            summary: "Immerse yourself in the vibrant culture and history of Bangladesh's capital city.",
            link: "#"
        }
    ];

    return (
        <div className="container mx-auto p-6 mt-20">
            <Typography variant="h2" color="blue-gray" className="text-center mb-4">
                Our Blog
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                    <Card key={index} className="p-6 shadow-lg">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            {post.title}
                        </Typography>
                        <Typography variant="paragraph" color="blue-gray" className="mb-4">
                            {post.summary}
                        </Typography>
                        <Button color="blue-gray" size="sm" variant="text" as="a" href={post.link}>
                            Read More
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
