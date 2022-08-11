import React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./Login";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUp from "./SignUp";

export default function Auth(props) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const tabChangeHandler = (e, val) => {
    setValue(val);
  };

  useEffect(() => {
    let authUser = localStorage.getItem("supabase.auth.token");
    if (authUser != null) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <Card className="card">
        <CardHeader className="card-header" title="Authentication"></CardHeader>
        <CardContent className="cardc">
          <Tabs variant="fullWidth" value={value} onChange={tabChangeHandler}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {value === 0 && (
            <div>
              <Login />
            </div>
          )}

          {value === 1 && (
            <div>
              {/* Signup/Registration screen to be added */}
              <SignUp setValue={setValue} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
