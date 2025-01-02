import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AuthProvider from "./Providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PackageDetails from "./Components/PackageDetails";
import TourGuideDetails from "./Components/TourGuideDetails";
import TouristStories from "./Components/TouristStories";
import StoryDetail from "./Components/StoryDetail";
import AllStories from "./Components/AllStories";
import AllPackages from "./Components/AllPackages";
import TourType from "./Components/TourType";
import TourTypePackages from "./Components/TourTypePackages";  
import DashboardLayout from "./Layouts/DashboardLayout";
import PrivateRoute from "./Routes/PrivateRoute";
import DynamicProfile from "./Components/Dashboard/Common/DynamicProfile";
import TouristProfile from "./Components/Dashboard/Tourist/TouristProfile";
import AdminProfile from "./Components/Dashboard/Admin/AdminProfile";
import GuideProfile from "./Components/Dashboard/Guide/GuideProfile";
import ProtectedRoute from "./Routes/ProtectedRoute";
import MyWishlist from "./Components/Dashboard/Tourist/MyWishList";
import MyBookings from "./Components/Dashboard/Tourist/MyBookings";
import MyAssignedTours from "./Components/Dashboard/Guide/MyAssignedTours";
import ManageUsers from "./Components/Dashboard/Admin/ManageUsers";
import RequestToTourGuide from "./Components/Dashboard/Tourist/RequestToTourGuide";
import AddPackageForm from "./Components/Dashboard/Admin/AddPackageForm";
import Community from "./Pages/Community";
import AboutUs from "./Pages/AboutUs";
import Blogs from "./Pages/Blogs";
import ContactUs from "./Pages/ContactUs";
import NotFound from "./Components/NotFound";
import EventsPage from "./Pages/EventsPage";
import EventDetails from "./Components/EventDetails";
import { PrimeReactProvider } from 'primereact/api';
import Leaderboard from "./Pages/Leaderboard";
import AnnouncementsList from "./Pages/AnnouncementsList";
import PostAnnouncementForm from "./Components/Dashboard/Guide/PostAnnouncementForm";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/events/:id",
        element: <PrivateRoute><EventDetails></EventDetails></PrivateRoute>,
      },
      {
        path: '/tourguide/:id',
        element: <TourGuideDetails></TourGuideDetails>,
      },
      {
        path: '/leaderboard',
        element: <PrivateRoute><Leaderboard></Leaderboard></PrivateRoute>,
      },
      {
        path: '/stories/:id',
        element: <StoryDetail></StoryDetail>,
      },
      {
        path: '/all-stories',
        element: <AllStories></AllStories>,
      },
      {
        path: '/events',
        element: <PrivateRoute><EventsPage></EventsPage></PrivateRoute>,
      },
      {
        path: '/tour-types',
        element: <TourType></TourType>,
      },
      {
        path: '/tour-types/:tourType',
        element: <TourTypePackages></TourTypePackages>,
      },
      {
        path: "/announcements",
        element:<AnnouncementsList></AnnouncementsList>
      },
      {
        path:"aboutUs",
        element:<AboutUs></AboutUs>
      },
      {
        path:'blogs',
        element:<Blogs></Blogs>
      },
      {
        path:"contactUs",
        element:<ContactUs></ContactUs>
      }
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><DynamicProfile></DynamicProfile></PrivateRoute>,
      },
      {
        path:'my-wishlist',
        element:<ProtectedRoute allowedRoles={['student']}><MyWishlist></MyWishlist></ProtectedRoute>
      }
      ,
      {
        path:'my-bookings',
        element:<ProtectedRoute allowedRoles={['student']}><MyBookings></MyBookings></ProtectedRoute>
      }
    ,
    {
      path:'announce',
      element:<ProtectedRoute allowedRoles={['moderator']}><PostAnnouncementForm></PostAnnouncementForm></ProtectedRoute>
    },
    {
      path:'manage-users',
      element:<ProtectedRoute allowedRoles={['admin']}><ManageUsers></ManageUsers></ProtectedRoute>
    },
    {path:'request-to-admin',
      element:<ProtectedRoute allowedRoles={['student']}><RequestToTourGuide></RequestToTourGuide></ProtectedRoute>
    },
    {
      path:"add-package",
      element:<ProtectedRoute allowedRoles={["admin"]}><AddPackageForm></AddPackageForm></ProtectedRoute>
    }
    ]
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <PrimeReactProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
);
