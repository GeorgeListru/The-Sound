import React from "react";

function Header({ children }) {
  return (
    <h1
      className={"mx-auto w-fit font-bold text-custom-blue-100 text-4xl mt-40"}
    >
      {children}
    </h1>
  );
}

export default Header;
