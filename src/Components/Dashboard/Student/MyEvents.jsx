/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Spinner } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(`${import.meta.env.VITE_PublishableKey}`);

const fetchBookings = async (email, page) => {
  const res = await axios.get(`http://localhost:5000/registrations/${email}?page=${page}&limit=10`);
  return res.data;
};

const PaymentForm = ({ bookingId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast.error(error.message);
    } else {
      const res = await axios.post("http://localhost:5000/create-payment-intent", {
        amount: amount,
      });

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.patch(`http://localhost:5000/registrations/${bookingId}/status`, {
          status: "Paid",
        });
        toast.success("Payment successful!");
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe} className="mt-4 w-full btn btn-success">
        Pay
      </Button>
    </form>
  );
};

const MyBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", user.email, currentPage],
    queryFn: () => fetchBookings(user.email, currentPage),
    enabled: !!user.email,
  });
  console.log(data);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/registrations/${id}`);
      queryClient.invalidateQueries(["bookings", user.email]);
      toast.success("Booking canceled successfully!");
    } catch (error) {
      console.error("Error canceling booking", error);
      toast.error("Failed to cancel booking");
    }
  };

  const handlePay = (booking) => {
    setSelectedBooking(booking);
  };

  // const handlePaymentSuccess = () => {
  //   queryClient.invalidateQueries(["bookings", user.email]);
  //   setSelectedBooking(null);
  // };

  const handlePaymentSuccess = () => {
    console.log(selectedBooking._id);
    axios.patch(`http://localhost:5000/registrations/${selectedBooking._id}/status`, {
            status: "Paid",
        })
        .then((response) => {
            if (response.status === 200) {
                queryClient.invalidateQueries(["bookings", user.email]);
                setSelectedBooking(null);
            } else {
                console.error("Unexpected response:", response);
                alert("Failed to update the status. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Failed to update registration status:", error);
            alert("Error updating payment status. Please try again.");
        });
};




  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Events</h2>
      <div className="overflow-x-scroll">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">Registration Deadline</th>
              <th className="px-4 py-2">Registration Date</th>
              <th className="px-4 py-2">Fee</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.registration.map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.eventTitle}</td>
                <td className="border px-4 py-2">{booking.registrationDeadline}</td>
                <td className="border px-4 py-2">{new Date(booking.registrationDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">${booking.registrationFee}</td>
                <td className="border px-4 py-2">{booking.status}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    {/* <Button
                      size="sm"
                      className="btn btn-error text-white"
                      onClick={() => handleCancel(booking._id)}
                      
                    >
                      Cancel
                    </Button> */}
                    <Button
                      size="sm"
                      className="btn btn-success text-white"
                      onClick={() => handlePay(booking)}
                      disabled={booking.registrationFee === 0 || booking.status==="Paid"}
                    >
                      {
                        booking.registrationFee === 0
                         ? "Free"
                          : `Pay $${booking.registrationFee}`
                      }
                      
                    </Button>
                    <Link to={`/events/${booking._id}`}>
                      <Button size="sm" className="btn btn-info btn-outline text-white">
                        Visit Details
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <ReactPaginate
            pageCount={Math.ceil(data.total / data.limit)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50">
          <div className="w-1/2 h-1/2 mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-xl">
  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Secure Payment</h3>
  <div className="flex items-center justify-center mb-6">
    <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 0v3.75M12 16.25v.01"
        />
        <circle cx="12" cy="12" r="9" />
      </svg>
    </div>
  </div>

  <div className="bg-white w-full p-6  rounded-lg shadow-md ">
    <Elements stripe={stripePromise}>
      <PaymentForm
        bookingId={selectedBooking._id}
        amount={selectedBooking.registrationFee}
        onSuccess={handlePaymentSuccess}
      />
    </Elements>
  </div>

  <button
    onClick={() => setSelectedBooking(null)}
    className="mt-6 w-full py-3 px-4 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition-colors duration-300"
  >
    Cancel
  </button>
</div>

        </div>
      )}
    </div>
  );
};

export default MyBookings;
