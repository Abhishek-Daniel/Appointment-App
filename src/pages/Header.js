import React, { useState } from "react";
import Button from "@mui/material/Button";
import { supabase } from "../database/Database";
import { useNavigate } from "react-router-dom";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Header.css";
import Modal from "@mui/material/Modal";
import Profile from "./Profile";

function Header(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert("Logged out");
      navigate("/auth", { replace: true });
      localStorage.removeItem("FirstName");
      localStorage.removeItem("LastName");
    } catch (err) {
      alert(err.message);
    }
  };
  const profileButtonHandler = () => {
    handleOpen();
  };

  const backButton = () => {
    navigate("/");
  };
  return (
    <div>
      <header className="header">
        {
          <div className="label">
            {props.Profile === true
              ? "Profile"
              : props.ChangeName === true
              ? "Change Name"
              : props.ChangePassword === true
              ? "Change Password"
              : "Make an Appointment"}
          </div>
        }

        {!props.Profile && (
          <div className="login-button">
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              color="primary"
              onClick={profileButtonHandler}
            >
              <div style={{ marginRight: "10px" }}>Profile</div>
              <AccountCircleSharpIcon />
            </Button>
            <Button variant="contained" color="primary" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        )}

        {props.Profile && (
          <div className="login-button">
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              color="primary"
              onClick={backButton}
            >
              <ArrowBackIcon />
              Back
            </Button>

            <Button variant="contained" color="primary" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        )}
      </header>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-content">
            <Profile />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
