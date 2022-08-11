import React from "react";
import { supabase } from "../database/Database";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const check = () => {
    const v = localStorage.getItem("supabase.auth.token");
    console.log(v);
  };
  const logout = async () => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert("Logged out");
      navigate("/auth", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="Auth">
      <p>Home Page</p>
      <button onClick={check}>Check Data</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
