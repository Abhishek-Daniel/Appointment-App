import React, { useEffect, useState } from "react";
import { supabase } from "../database/Database";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import "./common.css";
import { useNavigate } from "react-router-dom";

function ChangeName() {
  const [displayFirstName, setDisplayFirstname] = useState("");
  const [displayLastName, setDisplayLastname] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("dispNone");
  const [lastNameRequired, setLastNameRequired] = useState("dispNone");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let tempFirstName = localStorage.getItem("FirstName");
    let tempLastName = localStorage.getItem("LastName");
    setDisplayFirstname(tempFirstName);
    setDisplayLastname(tempLastName);
  }, []);

  const changeNameSubmit = async () => {
    if (!firstName === "" && !lastName === "") {
      const user = await supabase.auth.user();

      try {
        const { data, error } = await supabase
          .from("user")
          .update({ firstName: firstName, lastName: lastName })
          .eq("id", user.id);
        if (error) throw error;
        localStorage.setItem("FirstName", data[0].firstName);
        localStorage.setItem("LastName", data[0].lastName);
        setDisplayFirstname(firstName);
        setDisplayLastname(lastName);

        setTimeout(() => {
          alert("Name Changed Successfully, Navigating to home page");
          navigate("/");
        }, 500);
      } catch (err) {
        alert(err.message);
      }
    } else {
      firstName === ""
        ? setFirstNameRequired("dispBlock")
        : setFirstNameRequired("dispNone");

      lastName === ""
        ? setLastNameRequired("dispBlock")
        : setLastNameRequired("dispNone");
    }
  };

  return (
    <div>
      <Header ChangeName={true} />
      <Paper className="paper" elevation={3}>
        <div className="paper-divs">
          <div className=" left">
            <div className="x-large">
              Current Name : {displayFirstName} {displayLastName}
            </div>
            <div style={{ marginBottom: "20px", marginTop: "10px" }}>
              <FormControl required>
                <InputLabel htmlFor="username">First Name</InputLabel>
                <Input
                  id="firstName"
                  type="email"
                  firstname={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <div className={firstNameRequired}>
                  <div className="empty-field ">
                    Please fill out this field.
                  </div>
                </div>
              </FormControl>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <FormControl required>
                <InputLabel htmlFor="username">Last Name</InputLabel>
                <Input
                  id="lastName"
                  type="email"
                  lastname={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <div className={lastNameRequired}>
                  <div className="empty-field ">
                    Please fill out this field.
                  </div>
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
              Change Name
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default ChangeName;
