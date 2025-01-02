import {  FaArrowRight} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="container  mx-auto relative  ">
        <div className={`lg:min-h-[673px] max-h-[600px] min-h-[320px] overflow-hidden w-full lg:rounded-b-2xl bg-[url('/banner.jpg')] bg-cover object-cover bg-center`}>
        <div className="lg:min-h-[673px] max-h-[600px] min-h-[320px] flex flex-col justify-center items-center animated-banner">
          <h1 className="text-xl lg:text-5xl text-white max-w-3xl text-center mx-auto font-poppins font-bold">
          Welcome to the BUBT IT Club Event Management System!
          </h1>
          <p className="text-sm lg:text-xl mt-3 text-center px-12 text-base-100">Empowering students to grow, connect, and excel in the IT community.</p>
          <Link
            to={"/events"}
            className="cursor-pointer bg-blue-900 text-white border-0 py-1 px-3 rounded-full font-light hover:glass mx-auto mt-6 animate-bounce "
          ><span>Explore Events<FaArrowRight className="inline-block ml-1"></FaArrowRight></span></Link>
        </div>
        
        </div>
        
      </div>
    </>
  );
};

export default Banner;
