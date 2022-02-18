import React from "react";
import { motion } from "framer-motion";

const variants = {};

function Input({ name, type, placeholder }) {
  return (
    <motion.input
      initial={{ width: "100%", color: "teal" }}
      whileFocus={{ width: "102%", x: "-1%", color: "black" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={
        "h-10 font-bold px-3 leading-loose bg-custom-blue-200 outline-0 input-placeholder"
      }
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      required
    />
  );
}

export default Input;
