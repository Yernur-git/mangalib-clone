import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";



const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await fetch(`http://localhost:3001/users?email=${email}`);
        const data = await res.json();
        const user = data[0];

        if (user && bcrypt.compareSync(password, user.password)) {
            dispatch(loginSuccess({ user}));
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="auth-page-container">
            <div className="formContainer">
                <h2 className="formTitle">Login</h2>
                <div className="formGroup">
                    <label className="formLabel">Email</label>
                    <input className="formInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="formGroup">
                    <label className="formLabel">Password</label>
                    <input className="formInput" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="submitButton" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;