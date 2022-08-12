import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { supabase } from "../database/Database";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [emailRequired, setEmailRequired] = useState("dispNone");
  const [emailValid, setEmailValid] = useState("dispNone");

  const [firstname, setFirstname] = useState("");
  const [firstnameRequired, setFirstnameRequired] = useState("dispNone");
  const inputFirstNameChangeHandler = (e) => {
    setFirstname(e.target.value);
    setFirstnameRequired("dispNone");
  };

  const [lastnameRequired, setLastnameRequired] = useState("dispNone");
  const [lastname, setLastname] = useState("");
  const inputLastNameChangeHandler = (e) => {
    setLastname(e.target.value);
    setLastnameRequired("dispNone");
  };

  const inputEmailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailRequired("dispNone");
    setEmailValid("dispNone");
  };
  const navigate = useNavigate();

  const [registerPasswordRequired, setRegisterPasswordRequired] =
    useState("dispNone");
  const [registerPassword, setRegisterPassword] = useState("");
  const inputRegisterPasswordChangeHandler = (e) => {
    setRegisterPassword(e.target.value);
    console.log(e.target.value);
    setRegisterPasswordRequired("dispNone");
  };

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState("dispNone");
  const [isFailedRegister, setIsFailedRegister] = useState("dispNone");
  const [userCreated, setUserCreated] = useState(false);
  const [userData, setUserData] = useState({});

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    async function ch() {
      if (userCreated) {
        try {
          const { error } = await supabase
            .from("user")
            .insert([
              { id: userData.id, firstName: firstname, lastName: lastname },
            ]);
          if (error) throw error;
          localStorage.setItem("FirstName", firstname);
          localStorage.setItem("LastName", lastname);
        } catch (err) {
          alert(err.message);
        }
      }
    }
    ch();
  }, [userCreated, userData, firstname, lastname]);

  const registerClickHandler = async () => {
    firstname === ""
      ? setFirstnameRequired("dispBlock")
      : setFirstnameRequired("dispNone");

    lastname === ""
      ? setLastnameRequired("dispBlock")
      : setLastnameRequired("dispNone");

    email === "" ? setEmailRequired("dispBlock") : setEmailRequired("dispNone");

    email !== "" && !validateEmail(email)
      ? setEmailValid("dispBlock")
      : setEmailValid("dispNone");

    registerPassword === ""
      ? setRegisterPasswordRequired("dispBlock")
      : setRegisterPasswordRequired("dispNone");

    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      validateEmail(email) &&
      registerPassword !== ""
    ) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: `${email}`,
          password: `${registerPassword}`,
        });
        console.log(email, registerPassword);
        if (error) {
          throw error;
        }
        setUserData(user);
        setUserCreated(true);
        setRegistrationSuccess(true);
        setIsSuccessRegister("dispBlock");
        setIsFailedRegister("dispNone");
        alert("signed up");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (err) {
        setRegistrationSuccess(false);
        setIsSuccessRegister("dispNone");
        setIsFailedRegister("dispBlock");
        setTimeout(() => {
          alert(err.message);
        }, 1000);
      }
    }
  };

  return (
    <div className="registerFields">
      <div style={{ marginTop: "10px" }}>
        <FormControl required>
          <InputLabel htmlFor="firstname">First Name</InputLabel>
          <Input
            id="firstname"
            type="text"
            firstname={firstname}
            onChange={inputFirstNameChangeHandler}
          />
          <div className={firstnameRequired}>
            <div className="empty-field">Please fill out this field</div>
          </div>
        </FormControl>
      </div>
      <br />
      <FormControl required>
        <InputLabel htmlFor="lastname">Last Name</InputLabel>
        <Input
          id="lastname"
          type="text"
          lastname={lastname}
          onChange={inputLastNameChangeHandler}
        />
        <div className={lastnameRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
      </FormControl>
      <br />

      <FormControl required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          type="text"
          email={email}
          onChange={inputEmailChangeHandler}
        />
        <div className={emailRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
        <FormHelperText className={emailValid}>
          <span className="red">Enter valid Email</span>
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl required>
        <InputLabel htmlFor="registerPassword">Password</InputLabel>
        <Input
          id="registerPassword"
          type="password"
          registerpassword={registerPassword}
          onChange={inputRegisterPasswordChangeHandler}
        />
        <div className={registerPasswordRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
      </FormControl>
      <br />

      {registrationSuccess === true && (
        <FormControl>
          <span className={isSuccessRegister}>
            Registration Successful. Please Login!
          </span>
        </FormControl>
      )}

      {registrationSuccess === false && (
        <FormControl>
          <span className={isFailedRegister}>Registration Failed !</span>
          <span className={isFailedRegister}>
            User with this email already exists !
          </span>
        </FormControl>
      )}

      <br />
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={registerClickHandler}
      >
        REGISTER
      </Button>
    </div>
  );
}

export default SignUp;
