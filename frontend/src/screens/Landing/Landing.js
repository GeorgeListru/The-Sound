import React from "react";
import { motion } from "framer-motion";
import "./Landing.css";
import ListeningMusicSvg from "../../images/ListeningMusicSVG";
import Button from "../../components/Button/Button";
import BouncingBall from "../../components/BouncingBall";
import { Link } from "react-router-dom";
import {
  landingHeaderVariants,
  landingModalVariants,
} from "./LoadingAnimations";

export default function Landing(props) {
  return (
    <div className={"grid grid-cols-12 h-screen"}>
      <motion.div
        variants={landingHeaderVariants}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        className={"col-span-4 my-auto mx-auto pb-36 pr-12"}
      >
        <BouncingBall />
        <h1 className={"font-black text-custom-blue-400 text-7xl"}>
          The Sound
        </h1>
        <p className={"text-custom-blue-400 font-medium mt-2"}>
          Choose your best non copyrighted music. <br />
          Our library is huge and full of awesome content.
        </p>
        <Link to={"/register"}>
          <Button customClasses={"px-14 py-2.5 text-xl mt-5"}>
            Get Started
          </Button>
        </Link>
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.01,
          translateX: "-0.5rem",
          transition: { duration: 0.5 },
        }}
        className={"col-span-8 cursor-pointer"}
      >
        <motion.div
          variants={landingModalVariants}
          initial="initial"
          animate={"animate"}
          exit={"exit"}
          className={
            "bg-custom-blue-300 rounded-l-full w-full h-full absolute scale-150 origin-left"
          }
        />
        <ListeningMusicSvg
          styles={
            "absolute bottom-0 translate-x-[55%] scale-[1.35] origin-bottom"
          }
        />
      </motion.div>
    </div>
  );
}
