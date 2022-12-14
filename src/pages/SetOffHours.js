import React, { useEffect, useState } from "react";
import { supabase } from "../database/Database";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import "./common.css";
import { useNavigate } from "react-router-dom";
import TimePickerUtil from "./TimePickerUtil";

function SetOffHours() {
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
