
import { Card, Typography, Button } from "@material-tailwind/react";

const AboutUs = () => {
    return (
        <div className="container mx-auto p-6 mt-20">
            <Card className="p-6 shadow-lg">
                <Typography variant="h2" color="blue-gray" className="text-center mb-4">
                    About Us
                </Typography>
                <Typography variant="lead" color="blue-gray" className="mb-4">
                    Welcome to TripBangla, where adventure meets culture! Our mission is to provide unforgettable travel experiences across Bangladesh. We offer a wide range of tour packages, each designed to highlight the unique beauty and culture of our destinations.
                </Typography>
                <Typography variant="paragraph" color="blue-gray" className="mb-4">
                    From the lush green hills of Chittagong to the bustling streets of Dhaka, our tours cater to all types of travelers. Whether you're looking for an adventurous wildlife safari, a cultural immersion, or a relaxing beach getaway, TripBangla has something for everyone.
                </Typography>
                <div className="text-center">
                    <Button color="blue-gray" size="lg" className="btn">
                        Learn More
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AboutUs;
