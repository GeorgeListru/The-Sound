import React from "react";
import axios from "axios";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Button from "../../components/Button/Button";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { RegisterPageVariants } from "./RegisterAnimations";

function Register(props) {
  const navigate = useNavigate();

  function onSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const username = form.USERNAME.value;
    const email = form.EMAIL.value;
    const password = form.PASSWORD.value;
    const confirm_password = form["CONFIRM PASSWORD"].value;

    async function RegisterRequest() {
      const data = {
        username,
        email,
        password,
      };
      const config = {
        "Content-Type": "Application/json",
      };
      return axios.post("/register", data, config);
    }

    if (password === confirm_password) {
      RegisterRequest().then((response) => {
        navigate("/");
      });
    }
  }

  return (
    <motion.div
      variants={RegisterPageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <div
        className={
          "bg-custom-blue-300 h-screen w-1/2 mx-auto flex flex-col relative"
        }
      >
        <Header>SIGN UP</Header>
        <form
          onSubmit={onSubmitHandler}
          className={"w-1/2 h-100 mx-auto mt-8 grid grid-cols-1 gap-4"}
        >
          <div>
            <Label name={"USERNAME"} />
            <Input
              name={"USERNAME"}
              placeholder={"Enter your username"}
              type={"text"}
            />
          </div>
          <div>
            <Label name={"EMAIL"} />
            <Input
              name={"EMAIL"}
              placeholder={"Enter your email"}
              type={"email"}
            />
          </div>
          <div>
            <Label name={"PASSWORD"} />
            <Input
              name={"PASSWORD"}
              placeholder={"Enter your password"}
              type={"password"}
            />
          </div>
          <div>
            <Label name={"CONFIRM PASSWORD"} />
            <Input
              name={"CONFIRM PASSWORD"}
              placeholder={"Confirm your password"}
              type={"password"}
            />
          </div>
          <div className={"text-center"}>
            <Button customClasses={"px-14 py-1 text-xl mx-auto mt-2"}>
              REGISTER
            </Button>
          </div>
        </form>
        <Link
          to={"/login"}
          className={"text-custom-blue-100 mx-auto mt-auto mb-8"}
        >
          Already have an account? Sign In
        </Link>
      </div>
    </motion.div>
  );
}

export default Register;
