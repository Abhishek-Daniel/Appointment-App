import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Card, CardContent } from "@mui/material";
import "./common.css";
import Schedule from "./Schedule";
import Appointments from "./Appointments";

export default function Home() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("supabase.auth.token")) {
      navigate("/auth", { replace: true });
    }
  });
  const tabChangeHandler = (e, val) => {
    setValue(val);
  };

  return (
    <div className="Auth">
      <Header />
      <Card className="card">
        <CardContent style={{ padding: 0 }} className="cardc">
          <Tabs variant="fullWidth" value={value} onChange={tabChangeHandler}>
            <Tab label="Schedule" />
            <Tab label="Appointments" />
          </Tabs>
          {value === 0 && <Schedule />}

          {value === 1 && <div>Coming Soon Too !</div>}
        </CardContent>
      </Card>
    </div>
  );
}
