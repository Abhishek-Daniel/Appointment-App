import React, { useEffect } from "react";
import Header from "./Header";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./common.css";
import { useState } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import Modal from "@mui/material/Modal";
import ChangeName from "./ChangeName";
import ChangePassword from "./ChangePassword";
import SetOffHours from "./SetOffHours";
function Profile() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [openForEmailChange, setOpenForEmailChange] = useState(false);
  const [openForPasswordChange, setOpenForPasswordChange] = useState(false);
  const [openForSetOffHours, setOpenForSetOffHours] = useState(false);

  const [offHoursStart, setOffHoursStart] = useState("");
  const [offHoursEnd, setOffHoursEnd] = useState("");

  const handleOpenChangeEmail = () => setOpenForEmailChange(true);
  const handleCloseChangeEmail = () => setOpenForEmailChange(false);
  const handleOpenChangePassword = () => setOpenForPasswordChange(true);
  const handleCloseChangePassword = () => setOpenForPasswordChange(false);
  const handleOpenSetOffHours = () => setOpenForSetOffHours(true);
  const handleCloseSetOffHours = () => setOpenForSetOffHours(false);

  useEffect(() => {
    let tempFirstName = localStorage.getItem("FirstName");
    let tempLastName = localStorage.getItem("LastName");
    let tempOffHoursStart = localStorage.getItem("OffHoursStart");
    let tempOffHoursEnd = localStorage.getItem("OffHoursEnd");
    setFirstname(tempFirstName);
    setLastname(tempLastName);
    setOffHoursStart(tempOffHoursStart);
    setOffHoursEnd(tempOffHoursEnd);
  }, []);
  return (
    <div>
      <Header Profile={true} />
      <Paper className="paper" elevation={3}>
        <div className="paper-divs">
          <div className="x-large left">
            Name : {firstName} {lastName}
          </div>

          <div className="x-large right">Password : *********</div>
        </div>

        <div className="paper-divs">
          <div className="left">
            <Button
              style={{
                width: "40%",
              }}
              color="primary"
              variant="contained"
              onClick={() => handleOpenChangeEmail()}
            >
              Change Name
            </Button>
          </div>

          <div className="right">
            <Button
              style={{
                width: "40%",
              }}
              color="primary"
              variant="contained"
              onClick={() => handleOpenChangePassword()}
            >
              <LockResetIcon />
              <div style={{ paddingLeft: "5px" }}>Change Password</div>
            </Button>
          </div>
        </div>

        <div className="paper-divs">
          <div className="x-large left">
            Off Hours :{" "}
            {offHoursStart === "null" ? (
              "Not Set"
            ) : offHoursStart < 13 ? (
              <span>{offHoursStart} am</span>
            ) : (
              <span>{offHoursStart % 12} pm</span>
            )}
            {offHoursStart === "null" ? "" : " to "}
            {offHoursEnd === "null" ? (
              ""
            ) : offHoursEnd < 13 ? (
              <span>{offHoursEnd} am</span>
            ) : (
              <span>{offHoursEnd % 12} pm</span>
            )}
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
              onClick={() => handleOpenSetOffHours()}
            >
              Set Off Hours
            </Button>
          </div>
        </div>
      </Paper>
      <Modal
        open={openForEmailChange}
        onClose={handleCloseChangeEmail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <ChangeName />
        </div>
      </Modal>
      <Modal
        open={openForPasswordChange}
        onClose={handleCloseChangePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <ChangePassword />
        </div>
      </Modal>
      <Modal
        open={openForSetOffHours}
        onClose={handleCloseSetOffHours}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <SetOffHours />
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
