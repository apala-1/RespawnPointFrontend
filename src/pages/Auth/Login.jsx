import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            });

            console.log("Login Response:", response);

            if (response.data.token) {
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", response.data.token);
                console.log("Token saved:", response.data.token);

                if (user.role === "user") {
                    alert("User Login Successful!");
                    navigate("/user-dashboard");
                } else if (user.role === "admin") {
                    alert("If you are trying to log in as an admin, use the admin login page.");
                    navigate("/adminlogin");
                }
            } else {
                alert("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1>Login Form</h1>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button type="submit">Log In</button>
                    <div>
                        <a href="/forgot">Forgot your password?</a>
                    </div>
                    <div>
                        <a href="/signup">Create an account</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;