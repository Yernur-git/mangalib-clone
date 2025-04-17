import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = {
                username,
                email,
                password: hashedPassword,
                role: "reader"
            };

            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            navigate("/login");
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="formContainer">
            <h2 className="formTitle">Register</h2>

            <div className="formGroup">
                <label className="formLabel">Username</label>
                <input
                    className="formInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="formGroup">
                <label className="formLabel">Email</label>
                <input
                    className="formInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="formGroup">
                <label className="formLabel">Password</label>
                <input
                    className="formInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                className="submitButton"
                onClick={handleRegister}
                disabled={!username || !email || !password}
            >
                Register
            </button>
        </div>
    );
};

export default RegisterPage;