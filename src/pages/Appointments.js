import React from "react";
import Paper from "@mui/material/Paper";
import { supabase } from "../database/Database";
import { Card } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

function Appointments() {
  const [appointmentList, setAppointmentList] = useState([]);
  const allTimeslotsObject = {
    10: "10 am to 11 am",
    11: "11 am to 12 am",
    12: "12 pm to 1 pm",
    13: "1 pm to 2 pm",
    14: "2 pm to 3 pm",
    15: "3 pm to 4 pm",
    16: "4 pm to 5 pm",
    17: "5 pm to 6 pm",
    18: "6 pm to 7 pm",
    19: "7 pm to 8 pm",
    20: "8 pm to 9 pm",
  };

  useEffect(() => {
    async function fetchAppointmentList() {
      let tempAppList = [];
      try {
        const user = await supabase.auth.user();
        let { data: tempAppointmentList1, error } = await supabase
          .from("appointments")
          .select("*")
          .eq("ownerid", user.id);
        if (error) throw error;
        let { data: tempAppointmentList2, error2 } = await supabase
          .from("appointments")
          .select("*")
          .eq("guestid", user.id);
        if (error2) throw error2;
        tempAppList = tempAppList.concat(
          tempAppointmentList1,
          tempAppointmentList2
        );
        setAppointmentList(tempAppList);
      } catch (err) {
        alert(err.message);
      }
    }
    fetchAppointmentList();
  }, []);

  return (
    <div>
      {!appointmentList[0] && (
        <div>
          <div className="appointmentCards">
            <div className="paper-container-large">
              <Paper className="paper-large minHeightApp" elevation={3}>
                <div
                  style={{ marginBottom: "20px" }}
                  className="paper-container-appointment"
                >
                  <div className="x-large">No appointments</div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      )}
      {appointmentList.map((i) => {
        return (
          <div className="appointmentCards">
            <div key={i.id} className="paper-container-large">
              <Paper className="paper-large" elevation={3}>
                <div
                  style={{ marginBottom: "20px" }}
                  className="paper-container-appointment"
                >
                  <div className="x-large">
                    Appointment Date: {i.date + "/" + i.month + "/" + i.year}
                  </div>

                  <div className="large">
                    Time : {allTimeslotsObject[i.time]}{" "}
                  </div>
                  <div className="large">Title : {i.title} </div>
                  <div className="large">Agenda : {i.agenda}</div>
                  <div className="large">Scheduled By : {i.ownerName}</div>
                  <div className="large">Guest : {i.guestName}</div>
                  <br />
                </div>
              </Paper>
            </div>
          </div>
        );
      })}

      <Paper
        style={{ height: "89vh", padding: "0px" }}
        className="paper minHeight"
        elevation={3}
      >
        <Card className="paper minHeight"></Card>
      </Paper>
    </div>
  );
  herok;
}

export default Appointments;
