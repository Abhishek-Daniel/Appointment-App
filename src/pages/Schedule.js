import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import { supabase } from "../database/Database";
import DatePickerUtil from "./DatePickerUtil";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const navigate = useNavigate();
  const [guestOffHoursStart, setGuestOffHoursStart] = useState("");
  const [guestOffHoursEnd, setGuestOffHoursEnd] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [userIdForAppointment, setUserIdForAppointment] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentYear, setAppointmentYear] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentMonth, setAppointmentMonth] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [appointmentGuestName, setAppointmentGuestName] = useState("");
  const [appointmentOwnerName, setAppointmentOwnerName] = useState("");
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentTitleRequired, setAppointmentTitleRequired] =
    useState("dispNone");
  const [appointmentAgenda, setAppointmentAgenda] = useState("");
  const [appointmentAgendaRequired, setAppointmentAgendaRequired] =
    useState("dispNone");
  const [appointmentDateRequired, setAppointmentDateRequired] =
    useState("dispNone");
  const [appointmentDateLessThanCurrent, setAppointmentDateLessThanCurrent] =
    useState("dispNone");
  const [appointmentTimeRequired, setAppointmentTimeRequired] =
    useState("dispNone");
  const [timeSlots, setTimeSlots] = useState({
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
  });

  const [allMonths] = useState({
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  });

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
    async function fetchUsersList() {
      try {
        let { data: user, error } = await supabase.from("user").select("*");
        if (error) throw error;
        const userForArraySplice = await supabase.auth.user();
        setOwnerId(userForArraySplice.id);

        let { data: ownerName } = await supabase
          .from("user")
          .select("firstName,lastName")
          .eq("id", userForArraySplice.id);
        setAppointmentOwnerName(
          ownerName[0].firstName + " " + ownerName[0].lastName
        );
        // console.log(user);
        let filteredUserList = user.filter(function (item, index, arr) {
          return item.id !== userForArraySplice.id;
        });
        setUsersList(filteredUserList);
        if (error) throw error;
      } catch (err) {
        alert(err.message);
      }
    }
    fetchUsersList();
  }, []);

  useEffect(() => {
    if (
      userIdForAppointment !== "" &&
      dateSelected !== "" &&
      appointmentYear !== "" &&
      appointmentMonth !== "" &&
      appointmentDate !== ""
    ) {
      console.log("here");
      console.log(dateSelected);
      async function fetchAppointments() {
        let tempAllAlignedAppointments = [];
        try {
          let { data: guestAppointments, error } = await supabase
            .from("appointments")
            .select("*")
            .eq("guestid", userIdForAppointment)
            .eq("year", appointmentYear)
            .eq("month", appointmentMonth)
            .eq("date", appointmentDate);
          if (error) throw error;

          let { data: OwnerAppointments, error2 } = await supabase
            .from("appointments")
            .select("*")
            .eq("ownerid", ownerId)
            .eq("year", appointmentYear)
            .eq("month", appointmentMonth)
            .eq("date", appointmentDate);
          if (error2) throw error2;
          tempAllAlignedAppointments = tempAllAlignedAppointments.concat(
            guestAppointments,
            OwnerAppointments
          );

          console.log("Step 1===================", guestAppointments);
          console.log("Step 2===================", OwnerAppointments);
          console.log("Step 3===================", tempAllAlignedAppointments);
          let timeSlotsNotAvailable = [];
          tempAllAlignedAppointments.forEach((item) => {
            timeSlotsNotAvailable.push(item.time);
          });

          console.log("Step 4===================", timeSlotsNotAvailable);

          console.log(guestOffHoursStart);
          console.log(guestOffHoursEnd);
          for (let i = guestOffHoursStart; i < guestOffHoursEnd; ++i) {
            timeSlotsNotAvailable.push(i);
          }

          console.log("Step 5===================", timeSlotsNotAvailable);
          let netFilteredTimeSlots = allTimeslotsObject;
          console.log(netFilteredTimeSlots);
          timeSlotsNotAvailable.forEach((i) => {
            delete netFilteredTimeSlots[`${i}`];
          });

          console.log("Step 6===================", netFilteredTimeSlots);
          setTimeSlots(netFilteredTimeSlots);
        } catch (err) {
          alert(err.message);
        }
      }
      fetchAppointments();
    }
  }, [
    dateSelected,
    userIdForAppointment,
    appointmentYear,
    appointmentMonth,
    appointmentDate,
  ]);

  useEffect(() => {
    if (userIdForAppointment !== "")
      try {
        async function fetchUser() {
          let { data: user, error } = await supabase
            .from("user")
            .select("firstName,lastName")
            .eq("id", userIdForAppointment);
          if (error) throw error;
          console.log("-----------------------", user);
          setAppointmentGuestName(user[0].firstName + " " + user[0].lastName);
        }
        fetchUser();
      } catch (err) {
        alert(err.message);
      }
  }, [userIdForAppointment, appointmentGuestName]);
  //   console.log(appData);
  const handleChange = (event) => {
    setUserIdForAppointment(event.target.value);
    let userDataForOffHours = usersList.filter(function (item, index, arr) {
      return item.id === event.target.value;
    });
    setGuestOffHoursStart(userDataForOffHours[0].offHoursStart);
    setGuestOffHoursEnd(userDataForOffHours[0].offHoursEnd);
  };

  useEffect(() => {
    if (dateSelected !== "") {
      let dateData = dateSelected.toString().split(" ");
      setAppointmentYear(dateData[3]);
      setAppointmentDate(dateData[2]);
      setAppointmentMonth(allMonths[dateData[1]]);
    }
  }, [dateSelected, allMonths]);

  const selectTimeSlotHandler = (event) => {
    setAppointmentTime(event.target.value);
  };

  const selectDateHandler = (newDate) => {
    setDateSelected(newDate);
  };

  const scheduleAppointmentHandler = async () => {
    if (
      ownerId !== "" &&
      appointmentOwnerName !== "" &&
      userIdForAppointment !== "" &&
      appointmentGuestName !== "" &&
      appointmentTitle !== "" &&
      appointmentAgenda !== "" &&
      appointmentTime !== "" &&
      appointmentYear !== "" &&
      appointmentMonth !== "" &&
      appointmentDate !== ""
    ) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      if (appointmentDate <= dd) {
        setAppointmentDateLessThanCurrent("dispBlock");
      } else {
        setAppointmentDateLessThanCurrent("dispNone");
        try {
          const { error } = await supabase.from("appointments").insert([
            {
              ownerid: ownerId,
              ownerName: appointmentOwnerName,
              guestid: userIdForAppointment,
              guestName: appointmentGuestName,
              title: appointmentTitle,
              agenda: appointmentAgenda,
              time: appointmentTime,
              year: appointmentYear,
              month: appointmentMonth,
              date: appointmentDate,
            },
          ]);
          alert("Appointment Scheduled");
          setTimeout(() => {
            navigate("/");
          }, 500);
          if (error) throw error;
        } catch (err) {
          alert(err.message);
        }
      }
    }
  };

  return (
    <div>
      <Paper style={{ height: "85vh" }} className="paper" elevation={3}>
        <div className="paper-divs">
          <div className="x-large left">Select Guest</div>
        </div>
        {/* Guest */}
        <FormControl style={{ marginLeft: "0px" }} sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Guest</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={userIdForAppointment}
            onChange={handleChange}
          >
            {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
            {usersList.map((i) => {
              return (
                <MenuItem key={i.created_at} value={i.id}>
                  {i.firstName} {i.lastName}
                </MenuItem>
              );
            })}
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>

        {/* <div style={{ marginTop: "10px" }}> */}
        <div className="paper-divs">
          {/* <div style={{ marginTop: "10px" }} className="x-large ">
            Title :
          </div> */}

          {/* Title */}
          <FormControl style={{ marginTop: "10px" }} required>
            <InputLabel style={{ marginLeft: "-11px" }} htmlFor="username">
              Title
            </InputLabel>
            <Input
              id="appointmentTitle"
              type="text"
              appointmenttitle={appointmentTitle}
              onChange={(e) => setAppointmentTitle(e.target.value)}
            />
            <div className={appointmentTitleRequired}>
              <div className="empty-field ">Please fill out this field.</div>
            </div>
          </FormControl>

          {/* Agenda */}
          <FormControl
            style={{ marginLeft: "10px", marginTop: "10px" }}
            required
          >
            <InputLabel style={{ marginLeft: "-10px" }} htmlFor="username">
              Agenda
            </InputLabel>
            <Input
              id="email"
              type="text"
              appointmentagenda={appointmentAgenda}
              onChange={(e) => setAppointmentAgenda(e.target.value)}
            />
            <div className={appointmentAgendaRequired}>
              <div className="empty-field ">Please fill out this field.</div>
            </div>
          </FormControl>

          {/* Date */}
          <div style={{ marginLeft: "10px" }}>
            <DatePickerUtil
              value={dateSelected}
              setValue={selectDateHandler}
              label="Appointment Date"
            />
            <div className={appointmentDateRequired}>
              Please fill out this field.
            </div>
            <div className={appointmentDateLessThanCurrent}>
              Appointment date can't be less than current date
            </div>
          </div>

          {/* Time Slots */}
          <FormControl
            style={{ marginLeft: "10px", marginTop: "0px" }}
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel id="demo-simple-select-helper-label">
              Time Slots
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={appointmentTime}
              onChange={selectTimeSlotHandler}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}

              {Object.keys(timeSlots).map((h) => {
                // console.log(h);
                return (
                  <MenuItem key={h} value={h}>
                    {timeSlots[`${h}`]}
                  </MenuItem>
                );
              })}
              {/* {allTimeSlots.map((h) => {
                return Object.keys(h).map((i) => {
                  //   console.log(h[`${i}`]);
                  return (
                    <MenuItem key={i} value={i}>
                      {h[`${i}`]}
                    </MenuItem>
                  );
                });
              })} */}
            </Select>
            <div className={appointmentTimeRequired}>
              Please Select A Time Slot
            </div>
          </FormControl>

          {/* <FormControl style={{ marginLeft: "10px" }} required>
            <InputLabel style={{ marginLeft: "-11px" }} htmlFor="username">
              Time
            </InputLabel>
            <Input
              id="email"
              //   type="text"
              //   email={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />
            <div className={"dispNone"}>
              <div className="empty-field ">Please fill out this field.</div>
            </div>
          </FormControl> */}
        </div>

        {/* </div> */}

        <div style={{ marginTop: "10px" }} className="paper-divs">
          <div className="left">
            <Button
              style={{
                width: "40%",
              }}
              color="primary"
              variant="contained"
              onClick={() => scheduleAppointmentHandler()}
            >
              Schedule Appointment
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Schedule;
