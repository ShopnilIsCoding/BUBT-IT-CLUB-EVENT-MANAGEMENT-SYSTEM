import { Spinner } from "@material-tailwind/react";
import EventCard from "../Components/cards/EventCard";
import usePackages from "../hooks/usePackages";


const EventsPage = () => {
    const [events,isLoading]=usePackages();
    console.log(events)

    if (isLoading) {
        return (
          <div className="h-screen flex justify-center items-center">
            <Spinner className="h-16 w-16 text-gray-900/50" />
          </div>
        );
      }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:mt-24">
           {events.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
        </div>
    );
};

export default EventsPage;