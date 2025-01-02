import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {  FaMoneyBillWave, FaUsers, FaStar } from "react-icons/fa6";
import { FaCalendarAlt, FaLongArrowAltRight } from "react-icons/fa";
// import './TimelineDemo.css';
import { Timeline } from 'primereact/timeline';
import axios from "axios";
import { toast } from "react-toastify";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
// import { Card } from 'primereact/card';
const EventDetails = () => {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const[role]=useRole()
  console.log(role);
  const [registrationDate, setregistrationDate] = useState(new Date());
  const handleRegister = (event) => {
    event.preventDefault();
    console.log(pkg.earnPoints);
    

    const { _id, ...pkgWithoutId } = pkg;

const registrationData = {
  name: user.displayName,
  email: user.email,
  ...pkgWithoutId,
  registrationDate: registrationDate.toDateString(),
  status: pkg.registrationFee === 0 ? "Paid" : "Unpaid",
};


    axios.patch('http://localhost:5000/users/points',{
        email:user.email,
        point:pkg.earnPoints
    }).then(res=>
    {
       
           
            
            toast.success("Points updated successfully")

            setTimeout(()=>
            {
                window.location.reload();
            },2500)
        
    }
    )

    axios.post('http://localhost:5000/registrations', registrationData)
      .then(res => {
        if (res.data.insertedId) {
         toast.success("Check your registration section in dashboard for details")
        }
      })
      .catch((error) => {
        console.error("Error submitting booking:", error);
      });
  };

  const { isLoading: isPackageLoading, data: pkg } = useQuery({
    queryKey: ["packageDetail", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/events/${id}`);
      if (!res.ok) throw new Error("Failed to fetch event details");
      return res.json();
    },
  });
  


const customizedContent = (time) => {
    return (
        <Card className="p-4 shadow-lg mb-2">
       
        <div className="text-sm text-error">{time.time}</div>
        <div className="text-sm mt-1 text-warning">{time.activity}</div>
       
      </Card>
    );
};
const customizedContent2 = (time) => {
    return (
        <p className="bg-[#fff0] flex gap-4 items-center justify-center  mb-2">
        <div className="font-semibold text-primary text-3xl mb-1 ">{time.day}</div>
        <FaLongArrowAltRight className="text-3xl border-l border-primary text-primary" />
       
       
      </p>
    );
};

  if (isPackageLoading || isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 md:p-8 mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Event Card */}
        <Card className="shadow-lg bg-base-300 hover:shadow-xl transition-shadow duration-300 w-full">
          <CardHeader className="h-60 overflow-hidden border-4 border-primary">
            <img
              src={pkg?.eventImageUrl || "https://via.placeholder.com/400"}
              alt={pkg?.eventTitle || "Event"}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 font-bold text-lg text-primary"
            >
              {pkg?.eventTitle || "Event Title"}
            </Typography>
            <div className="text-sm mb-4">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                <Typography className="">
                  Deadline: {pkg?.registrationDeadline || "Unknown"}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-yellow-500" />
                <Typography className="">
                  Fee: {pkg?.registrationFee ? `$${pkg?.registrationFee}` : "Free"}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-green-500" />
                <Typography className="">
                  Registered: {pkg?.currentRegisteredCount || 0} students
                </Typography>
              </div>
            </div>
            <Typography className="text-sm text-gray-600 mb-4">
              {pkg?.eventDetails || "Detailed description of event goes here."}
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-between items-center">
            <Button disabled={pkg.eventType!=="upcoming" || (role==="admin" || role==="moderator")} onClick={handleRegister} color="green"  className="uppercase text-green-500" >
              Register Now
            </Button>
           
          </CardFooter>
        </Card>

        {/* Timeline & Additional Info */}
        <div className="shadow-md rounded-lg bg-base-100 border-2 border-primary p-4">
          <Typography variant="h6" className="font-semibold mb-2 ">
            Event Timeline
          </Typography>
          <div className="space-y-2">
            {/* {pkg?.eventTimeline?.map((time, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 p-2 rounded-md"
              >
                <FaCalendarAlt className="text-blue-700" />
                <Typography className="text-sm ">{time.time}</Typography>
              </div>
            )) || <p className="text-gray-600 text-sm">No timeline details available.</p>} */}
            <Timeline opposite={customizedContent2} value={pkg.eventTimeline} layout="vertical" content={customizedContent}></Timeline>
          </div>
          <div className="mt-4">
            <Typography variant="h6" className="font-semibold  mb-2">
              Rewards & Points
            </Typography>
            <div className="flex items-center gap-2">
            <img src={'/coin.png'} alt="Coin" className="spinning-coin" />
              <Typography className="text-sm ">
                Earn <span className="text-yellow-700 font-bold animate-bounce">{pkg.earnPoints}</span> points by attending this event!
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
