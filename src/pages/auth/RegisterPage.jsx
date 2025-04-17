import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
      const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { email, password: hashedPassword, role: "reader" };
    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    navigate("/login");
  };

  return (
      <div className="formContainer">
          <h2 className="formTitle">Register</h2>
          <div className="formGroup">
              <label className="formLabel">Email</label>
              <input className="formInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="formGroup">
              <label className="formLabel">Password</label>
              <input className="formInput" type="password" value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className="submitButton" onClick={handleRegister}>Register</button>
      </div>

  );
};

export default RegisterPage;
