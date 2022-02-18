import React from "react";

function Label({ name }) {
  return (
    <label htmlFor={name} className={"font-bold text-custom-blue-100 text-lg "}>
      {name}
    </label>
  );
}

export default Label;
