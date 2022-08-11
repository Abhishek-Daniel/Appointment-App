import React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./Login";
import { Card, CardContent, CardHeader } from "@mui/material";

export default function Auth() {
  const [value, setValue] = useState(0);

  const tabChangeHandler = (e, val) => {
    setValue(val);
  };

  return (
    // <div className="Auth">
    //   <input
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={() => login(email, password, navigate)}>login</button>
    //   <button onClick={() => signup(email, password, navigate)}>signup</button>
    // </div>

    <div>
      <Card className="card">
        <CardHeader className="card-header" title="Authentication"></CardHeader>
        <CardContent className="card">
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
              Signup/Registration screen to be added
              {/* <SignUp/> */}
            </div>
          )}
        </CardContent>
      </Card>

      {/* {value === 0 && <Login />} */}

      {/* <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        aria-label="basic tabs example"
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
        <Tab label="Item Three" />
      </Tabs> */}
    </div>
  );
}

// const signup = async (email, password, navigate) => {
//   //   console.log(email, password);
//   try {
//     const { error } = await supabase.auth.signUp({ email, password });
//     if (error) throw error;
//     alert("signed in");
//     navigate("/home", { replace: true });
//   } catch (error) {
//     alert(error.message);
//   }
// };
