import React from "react";

function Button({ children, customClasses }) {
  return (
    <button
      className={
        "text-custom-blue-400 font-bold bg-custom-blue-100 " + customClasses
      }
    >
      {children}
    </button>
  );
}

export default Button;
