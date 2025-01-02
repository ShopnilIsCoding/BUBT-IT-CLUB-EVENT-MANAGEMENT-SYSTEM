
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const EventCard = ({
    _id,
  eventTitle,
  eventImageUrl,
  eventDetails,
  registrationDeadline,
  registrationFee,
  eventTimeline,
  currentRegisteredCount,
  earnPoints,
  eventType,
}) => {
  return (
    <Card className=" mt-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="h-52 overflow-hidden">
        <img
          src={eventImageUrl}
          alt={eventTitle}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
          {eventTitle}
        </Typography>
        <Typography variant="small" color="gray" className="mb-4">
          {eventDetails}
        </Typography>
        <div className="text-sm space-y-1">
          <Typography>
            <span className="font-semibold">Registration Deadline:</span> {registrationDeadline}
          </Typography>
          <Typography>
            <span className="font-semibold">Registration Fee:</span> {registrationFee > 0 ? `$${registrationFee}` : "Free"}
          </Typography>
          <Typography>
            <span className="font-semibold">Current Registrations:</span> {currentRegisteredCount}
          </Typography>
          <Typography>
            <span className="font-semibold">Earn Points:</span> {earnPoints}
          </Typography>
          <Typography>
            <span className={`font-semibold ${eventType === "upcoming" ? "text-blue-500" : eventType === "ongoing" ? "text-green-500" : "text-gray-500"}`}>
              {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
            </span>
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <Link to={`/events/${_id}`}>
        <Button size="sm" color="blue" className="uppercase text-primary font-bold">View Details</Button></Link>
       
      </CardFooter>
    </Card>
  );
};

export default EventCard;