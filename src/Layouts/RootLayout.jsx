import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// import Footer from "../Components/Footer";

const RootLayout = () => {
  const [cubeCount, setCubeCount] = useState(10); // Default cube count for medium devices

  useEffect(() => {
    const updateCubeCount = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setCubeCount(5); // Fewer cubes for small screens
      } else if (width < 1024) {
        setCubeCount(10); // Medium cube count for tablets
      } else {
        setCubeCount(20); // More cubes for larger screens
      }
    };

    // Set cube count on load and on resize
    updateCubeCount();
    window.addEventListener("resize", updateCubeCount);

    return () => window.removeEventListener("resize", updateCubeCount);
  }, []);

  return (
    <>
    <div className= "glassbg2 absolute min-h-20 w-full  top-0"></div>
   
    <div className="container mx-auto relative">
    <Navbar />
      {/* Cube elements */}
      <div className="animated-cubes">
        {[...Array(cubeCount)].map((_, index) => (
          <div key={index} className="cube"></div>
        ))}
      </div>

      {/* Page content */}
      
      <Outlet />
      
    </div>
    <Footer />
    </>
  );
};

export default RootLayout;
