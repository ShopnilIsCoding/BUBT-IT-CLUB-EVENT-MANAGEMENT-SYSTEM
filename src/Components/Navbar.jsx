import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "night"
  );
  const [point,setPoint]=useState(0)
  const [isChecked, setIsChecked] = useState(() => theme === "nord");
  const {logOut,user}=useAuth();
  //console.log(user);
  const handleToggle = (e) => {
    const selectedTheme = e.target.checked ? "nord" : "night";
    setTheme(selectedTheme);
    setIsChecked(e.target.checked);
    localStorage.setItem("theme", selectedTheme);
  };
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const [scrolled, setScrolled] = useState(false);

  // Scroll event listener logic
  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll position:", window.scrollY); // Log raw scroll position
      const isScrolled = window.scrollY > 20; // Change condition as needed
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Trigger the logic on initial page load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    console.log("Scrolled state value updated:", scrolled);
  }, [scrolled]);
  
  const {data:data,isLoading}=useQuery({
    queryKey:['point'],
    enabled:!!user?.email,
    queryFn:async()=>{
        const response=await axios.get(`http://localhost:5000/user/${user?.email}`);
        return response.data
    },
})
  


  const handleLogOut=()=>
    {
      logOut()
      .then(()=>
      {
        Swal.fire(
          'Logged out!',
          'You are now logged out.',
         'success'
        )
      })
    }
    if(isLoading)
    {
      return <div></div>
    }
    return (
      <>
        {/* // <div className="topBotomBordersIn flex space-x-4">
        //     <a className="relative inline-block ">HOME</a>
        //     <a className="relative inline-block ">ARTICLES</a>
        //     <a className="relative inline-block ">PORTFOLIO</a>
        //     <a className="relative inline-block ">ABOUT</a>
        //     <a className="relative inline-block ">CONTACT</a>
        // </div> */}
        <div className="sticky h-0 container z-50 top-0 poppins-semibold  mx-auto ">
        <div className={`navbar container mx-auto  ${
        scrolled ? "bg-[#1e3b8a] glassbg2" : "bg-transparent"
      }  `}>
  <div className="navbar-start">
    <div className="dropdown  lg:invisible">
      <div tabIndex={0} role="button" className="btn btn-ghost ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#0d11659e] rounded-box w-fit">
      <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white glassbg font-semibold text-center delay-75 transition-all" : " p-2 text-blue-200 font-bold"
  } to={'/'}>Home</NavLink></li>
    <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white glassbg font-semibold text-center delay-75 transition-all" : " p-2 text-blue-200 font-bold"
  } to={'/events'}>Events</NavLink></li>
    <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white glassbg font-semibold text-center delay-75 transition-all" : " p-2 text-blue-200 font-bold"
  } to={'/leaderboard'}>Leaderboard</NavLink></li>
    
    <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white glassbg font-semibold text-center delay-75 transition-all" : " p-2 text-blue-200 font-bold"
  } to={'/announcements'}>Announcements</NavLink></li>
    
      </ul>
    </div>
    <img src="/logo.png" className="h-16" alt="" />
  </div>
  <div className="navbar-center hidden lg:flex py-0 glassbg rounded-full">
    <div className="menu  menu-horizontal gap-2 py-1 px-1 circleBehind font-poppins">
    <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white font-semibold text-center delay-75 transition-all animate-pulse " : " p-2 text-blue-200 font-bold"
  } to={'/'}>Home</NavLink></li>
    <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white  font-semibold text-center delay-75 transition-all animate-pulse" : " p-2 text-blue-200 font-bold"
  } to={'/events'}>Events</NavLink></li>
    <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white  font-semibold text-center delay-75 transition-all animate-pulse" : " p-2 text-blue-200 font-bold"
  } to={'/leaderboard'}>Leaderboard</NavLink></li>
    
    <li><NavLink className={({ isActive}) =>
    isActive ? "  p-2 text-white  font-semibold text-center delay-75 transition-all animate-pulse" : " p-2 text-blue-200 font-bold"
  } to={'/announcements'}>Announcements</NavLink></li>
   
    </div>
  </div>
  <div className="navbar-end gap-3">
  {user? <div className="flex items-center justify-center mr-3 ">
  <img src={'/coin.png'} alt="Coin" className="spinning-coin" />
      <span className="text-yellow-700 text-2xl">{data.point}</span>
    </div> : <></>}
  <label className="cursor-pointer md:grid place-items-center hidden lg:grid ">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={isChecked}
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
    {!user && <Link to={'/login'} className="cursor-pointer bg-blue-text-blue-200 text-white border  py-1 px-3 rounded-full t glass">Login</Link>}
     {user && <div className="dropdown dropdown-end text-primary ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full border-2 border-primary ">
          <img alt={user.displayName} src={ '/user.png'} className="glass" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-fit bg-[#0d11659e]">
        <p className="ml-3 my-1">
          <a >
            {user.displayName}
          </a>
        </p>
        <p className="ml-3 my-1"><a>{user.email}</a></p>
        <li><Link to={'dashboard'}>Dashboard</Link></li>
        <li onClick={handleLogOut}><a>Logout</a></li>
      </ul>
    </div>}

  
  </div>
</div>
        </div>
        </>
    );
};

export default Navbar;
