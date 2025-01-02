import { Card, Typography, Button } from "@material-tailwind/react";

const Community = () => {
    return (
        <div className="container mx-auto p-6 mt-20">
            <Card className="p-6 shadow-lg">
                <Typography variant="h2" color="blue-gray" className="text-center mb-4">
                    Join Our Community
                </Typography>
                <Typography variant="lead" color="blue-gray" className="mb-4">
                    Become a part of the TripBangla community and connect with fellow travelers! Share your experiences, tips, and travel stories with a vibrant community of adventurers.
                </Typography>
                <Typography variant="paragraph" color="blue-gray" className="mb-4">
                    Our community is a space for inspiration and support. Whether you're a seasoned traveler or planning your first trip, you'll find valuable insights and make new friends along the way.
                </Typography>
                <div className="text-center">
                    <Button color="blue-gray" size="lg" className="btn">
                        Join Now
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Community;
