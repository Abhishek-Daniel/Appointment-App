import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
// import "./common.css";
import { supabase } from "../database/Database";
import { useNavigate } from "react-router-dom";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailRequired, setEmailRequired] = useState("dispNone");
  const [emailValid, setEmailValid] = useState("dispNone");
  const [loginPasswordRequired, setLoginPasswordRequired] =
    useState("dispNone");
  const navigate = useNavigate();
  const inputLoginPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
    setLoginPasswordRequired("dispNone");
  };

  const loginClickHandler = async () => {
    email === "" ? setEmailRequired("dispBlock") : setEmailRequired("dispNone");
    password === ""
      ? setLoginPasswordRequired("dispBlock")
      : setLoginPasswordRequired("dispNone");
    email !== "" && !validateEmail(email)
      ? setEmailValid("dispBlock")
      : setEmailValid("dispNone");

    if (email !== "" && validateEmail(email) && password !== "") {
      try {
        const { error, user } = await supabase.auth.signIn({ email, password });
        sessionStorage.setItem("uuid", user.id);
        localStorage.getItem(supabase.auth.token);
        // console.log(user.id);
        if (error) throw error;
        alert("logged in");
        navigate("/home", { replace: true });

        // const data = await login(email, loginPassword);
        // if (data[1] === 200) {
        //   sessionStorage.setItem("uuid", data[0].id);
        //   sessionStorage.setItem("access-token", data[0].accessToken);

        //   setLoggedIn(
        //     sessionStorage.getItem("access-token") === null ||
        //       sessionStorage.getItem("access-token") === undefined
        //       ? false
        //       : true
        //   );

        //   setIsSuccessLogin("dispBlock");
        //   setIsFailedLogin("dispNone");

        //   setTimeout(() => {
        //     props.closeModal();
        //   }, 1000);
        // } else {
        //   setLoggedIn(
        //     sessionStorage.getItem("access-token") === null ||
        //       sessionStorage.getItem("access-token") === undefined
        //       ? false
        //       : true
        //   );
        //   setIsSuccessLogin("dispNone");
        //   setIsFailedLogin("dispBlock");
        // }
      } catch (err) {
        // console.log("Backend Not Running");
        alert(err.message);
      }
    }
  };

  return (
    <div className="loginFields">
      <div style={{ marginTop: "10px" }}>
        <FormControl required>
          <InputLabel htmlFor="username">Email</InputLabel>
          <Input
            id="email"
            type="email"
            email={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={emailRequired}>
            <div className="empty-field">Please fill out this field.</div>
          </div>
          <FormHelperText className={emailValid}>
            <span className="red">Enter valid Email</span>
          </FormHelperText>
        </FormControl>
      </div>
      <br />

      <div>
        <FormControl required>
          <InputLabel htmlFor="loginPassword">Password</InputLabel>
          <Input
            id="loginPassword"
            type="password"
            loginpassword={password}
            onChange={inputLoginPasswordChangeHandler}
          />
          <div className={loginPasswordRequired}>
            <div className="empty-field">Please fill out this field.</div>
          </div>
        </FormControl>
      </div>
      <br />

      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={loginClickHandler}
      >
        LOGIN
      </Button>
    </div>
  );
}

export default Login;
