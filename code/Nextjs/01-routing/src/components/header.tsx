import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="container flex items-center justify-between mx-auto px-5 h-14">
        <h1 className="font-bold text-xl ">Home</h1>
        <div className=" flex gap-2">
          <h1>Peroformance</h1>
          <h1>Reliability</h1>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
