import React from "react";
import axios from "axios";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Button from "../../components/Button/Button";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { LoginPageVariants } from "./LoginVariants";
import { login } from "../../redux/LoginDataSlice";
import { useDispatch, useSelector } from "react-redux";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.EMAIL.value;
    const password = form.PASSWORD.value;

    async function LoginRequest() {
      const data = {
        username: email,
        password,
      };
      const config = {
        "Content-Type": "Application/json",
      };
      return axios.post("/login", data, config);
    }

    LoginRequest().then((response) => {
      dispatch(login(response.data));
      navigate("/player");
    });
  }

  return (
    <motion.div
      variants={LoginPageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <div
        className={
          "bg-custom-blue-300 h-screen w-1/2 mx-auto flex flex-col relative"
        }
      >
        <Header>SIGN IN</Header>
        <form
          onSubmit={onSubmitHandler}
          className={"w-1/2 h-100 mx-auto mt-8 grid grid-cols-1 gap-4"}
        >
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
          <div className={"text-center"}>
            <Button customClasses={"px-14 py-1 text-xl mx-auto mt-2"}>
              LOG IN
            </Button>
          </div>
        </form>
        <Link
          to={"/register"}
          className={"text-custom-blue-100 mx-auto mt-auto mb-8"}
        >
          Don't have an account yet? Sign up
        </Link>
      </div>
    </motion.div>
  );
}

export default Login;
