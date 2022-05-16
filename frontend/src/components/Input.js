import React from "react";
import { motion } from "framer-motion";

const variants = {};

function Input({
  name,
  type,
  placeholder,
  onChangeEvent,
  required = true,
  value,
}) {
  return (
    <motion.input
      onChange={onChangeEvent && onChangeEvent}
      initial={{ width: "100%" }}
      whileFocus={
        (name === "Search" && { color: "black" }) || {
          width: "102%",
          x: "-1%",
          color: "black",
        }
      }
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={
        "h-10 font-bold px-2 leading-loose bg-custom-blue-200 outline-0 input-placeholder text-custom-blue-300 outline-none"
      }
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      required={required}
      value={value && value}
    />
  );
}

export default Input;
