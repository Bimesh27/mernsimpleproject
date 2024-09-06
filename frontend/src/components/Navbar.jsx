import React from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";


const Navbar = () => {

   return (
      <div className="max-w-[1140px] px-10">
         <div className="h-16 items-center justify-between flex">
            <h1 className="font-bold text-2xl uppercase items-center max-sm:text-lg">
               <Link to="/">Product Store🛒</Link>
            </h1>

            <Link to={"/create"}>
               <CiSquarePlus className="text-3xl" />
            </Link>
         </div>
      </div>
   );
};

export default Navbar;
