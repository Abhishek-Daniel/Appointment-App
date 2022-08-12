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
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import TimePickerUtil from "./TimePickerUtil";

function SetOffHours() {
  const [displayFirstName, setDisplayFirstname] = useState("");
  const [displayLastName, setDisplayLastname] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("dispNone");
  const [lastNameRequired, setLastNameRequired] = useState("dispNone");
  //   const [firstName, setFirstName] = useState("");
  const [startLessThanEnd, setStartLessThanEnd] = useState("dispNone");
  const [startEqualsEnd, setStartEqualsEnd] = useState("dispNone");
  const [offHoursStart, setOffHoursStart] = useState(
    new Date("2022", "0", "1", "10", "0", "00", "0")
  );

  const [offHoursEnd, setOffHoursEnd] = useState(
    new Date("2022", "0", "1", "10", "0", "00", "0")
  );
  const navigate = useNavigate();

  useEffect(() => {}, [offHoursStart, offHoursEnd]);

  const submitOffHours = async () => {
    offHoursStart.getHours() > offHoursEnd.getHours()
      ? setStartLessThanEnd("dispBlock")
      : setStartLessThanEnd("dispNone");

    offHoursStart.getHours() === offHoursEnd.getHours()
      ? setStartEqualsEnd("dispBlock")
      : setStartEqualsEnd("dispNone");

    if (offHoursStart.getHours() < offHoursEnd.getHours()) {
      const user = await supabase.auth.user();

      try {
        const { data, error } = await supabase
          .from("user")
          .update({
            offHoursStart: offHoursStart.getHours(),
            offHoursEnd: offHoursEnd.getHours(),
          })
          .eq("id", user.id);
        if (error) throw error;
        localStorage.setItem("OffHoursStart", data[0].offHoursStart);
        localStorage.setItem("OffHoursEnd", data[0].offHoursEnd);
        setTimeout(() => {
          alert("Off Hours Set, Navigating to home page");
          navigate("/");
        }, 500);
      } catch (err) {
        alert(err.message);
      }
    }
  };
  //   const changeNameSubmit = async () => {
  //     if (firstName !== "" && lastName !== "") {
  //       const user = await supabase.auth.user();

  //       try {
  //         const { data, error } = await supabase
  //           .from("user")
  //           .update({ firstName: firstName, lastName: lastName })
  //           .eq("id", user.id);
  //         if (error) throw error;

  //         localStorage.setItem("FirstName", data[0].firstName);
  //         localStorage.setItem("LastName", data[0].lastName);
  //         setDisplayFirstname(firstName);
  //         setDisplayLastname(lastName);

  //         setTimeout(() => {
  //           alert("Off Hours Set, Navigating to home page");
  //           navigate("/");
  //         }, 500);
  //       } catch (err) {
  //         alert(err.message);
  //       }
  //     } else {
  //       firstName === ""
  //         ? setFirstNameRequired("dispBlock")
  //         : setFirstNameRequired("dispNone");

  //       lastName === ""
  //         ? setLastNameRequired("dispBlock")
  //         : setLastNameRequired("dispNone");
  //     }
  //   };

  return (
    <div>
      <Header SetOffHours={true} />
      <Paper className="paper" elevation={3}>
        <div className="paper-divs">
          <div className=" left">
            <div className="x-large">
              Start of Off Hours :{" "}
              <div style={{ marginBottom: "20px", marginTop: "10px" }}></div>
              <TimePickerUtil
                value={offHoursStart}
                setValue={setOffHoursStart}
                label="Starting from"
              />
            </div>
            <div style={{ marginBottom: "20px", marginTop: "10px" }}></div>
            <div className="x-large">
              End of Off Hours :{" "}
              <div style={{ marginBottom: "20px", marginTop: "10px" }}></div>
              <div>
                <TimePickerUtil
                  value={offHoursEnd}
                  setValue={setOffHoursEnd}
                  label="Ending at"
                />
              </div>
            </div>
            <div style={{ marginBottom: "20px", marginTop: "10px" }}></div>
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
              onClick={() => submitOffHours()}
            >
              Submit Off Hours
            </Button>
            <div style={{ width: "40%" }} className={startLessThanEnd}>
              <div className="empty-field ">
                Start Time can't be less than End Time
              </div>
            </div>
            <div style={{ width: "40%" }} className={startEqualsEnd}>
              <div className="empty-field ">
                Start Time and End Time can't be same
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SetOffHours;
