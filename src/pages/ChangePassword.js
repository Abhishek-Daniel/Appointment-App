import React, { useState } from "react";
import { supabase } from "../database/Database";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import "./common.css";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [firstPasswordRequired, setFirstPasswordRequired] =
    useState("dispNone");
  const [passwordMatchRequired, setPasswordMatchRequired] =
    useState("dispNone");
  const [secondPasswordRequired, setSecondPasswordRequired] =
    useState("dispNone");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const navigate = useNavigate();

  const changeNameSubmit = async () => {
    if (
      !firstPassword === "" &&
      !secondPassword === "" &&
      firstPassword === secondPassword
    ) {
      try {
        const { error } = await supabase.auth.update({
          password: firstPassword,
        });
        if (error) throw error;

        setTimeout(() => {
          alert("Password Changed Successfully, Navigating to home page");
          navigate("/");
        }, 500);
      } catch (err) {
        alert(err.message);
      }
    } else {
      firstPassword === ""
        ? setFirstPasswordRequired("dispBlock")
        : setFirstPasswordRequired("dispNone");

      secondPassword === ""
        ? setSecondPasswordRequired("dispBlock")
        : setSecondPasswordRequired("dispNone");

      firstPassword !== secondPassword
        ? setPasswordMatchRequired("dispBlock")
        : setPasswordMatchRequired("dispNone");
    }
  };

  return (
    <div>
      <Header ChangePassword={true} />
      <Paper className="paper" elevation={3}>
        <div className="paper-divs">
          <div className=" left">
            <div className="x-large">Enter New Password</div>
            <div style={{ marginBottom: "20px", marginTop: "10px" }}>
              <FormControl required>
                <InputLabel htmlFor="username">Password</InputLabel>
                <Input
                  id="firstPassword"
                  type="password"
                  firstpassword={firstPassword}
                  onChange={(e) => {
                    setFirstPassword(e.target.value);
                  }}
                />
                <div className={firstPasswordRequired}>
                  <div className="empty-field ">
                    Please fill out this field.
                  </div>
                </div>
              </FormControl>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <FormControl required>
                <InputLabel htmlFor="username">Confirm Password</InputLabel>
                <Input
                  id="secondPassword"
                  type="password"
                  secondpassword={secondPassword}
                  onChange={(e) => {
                    setSecondPassword(e.target.value);
                  }}
                />
                <div className={secondPasswordRequired}>
                  <div className="empty-field ">
                    Please fill out this field.
                  </div>
                </div>
                <div className={passwordMatchRequired}>
                  <div className="empty-field ">Password doesn't match</div>
                </div>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="paper-divs">
          <div className="left">
            <Button
              style={{
                width: "40%",
              }}
              color="primary"
              variant="contained"
              onClick={() => changeNameSubmit()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default ChangePassword;
