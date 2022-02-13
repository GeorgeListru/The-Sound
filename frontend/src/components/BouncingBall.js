import React from "react";
import { motion } from "framer-motion";

function BouncingBall() {
  const transitionValues = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
    type: "spring",
    stiffness: 100,
  };

  const ballStyle = {
    display: "block",
    width: "2rem",
    height: "2rem",
    backgroundColor: "#303C6C",
    borderRadius: "5rem",
    position: "absolute",
    top: "-4%",
  };

  return (
    <motion.span
      style={ballStyle}
      transition={{
        y: transitionValues,
        x: transitionValues,
        width: transitionValues,
        height: transitionValues,
      }}
      animate={{
        y: ["0rem", "-5rem", "0rem"],
        x: ["0rem", "20.2rem"],
        width: ["2rem", "2.4rem", "2rem"],
        height: ["1.6rem", "2.6rem", "1.6rem"],
      }}
    />
  );
}

export default BouncingBall;
