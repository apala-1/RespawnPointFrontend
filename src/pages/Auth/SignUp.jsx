import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullName = event.target.fullname.value.trim();
        const email = event.target.email.value.trim();
        const username = event.target.username.value.trim();
        const gender = event.target.gender.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirm_password.value;
    
        // Validation
        if (fullName.length < 3) {
            setError("Full name must be at least 3 characters long.");
            return;
        }
        if (!/^[a-zA-Z0-9_]{3,}$/.test(username)) {
            setError("Username must be at least 3 characters and contain only letters, numbers, or underscores.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid email format.");
            return;
        }
        if (!gender) {
            setError("Please select a gender.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/auth/register", {
                name: fullName,
                email,
                username,
                gender,
                password,
            });
    
            alert("Sign Up Successful!");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };
    
    return (
        <div className="signup">
            <div className="signup-container">
                <h1>Sign Up Form</h1>
                {error && <p className="error-message">{error}</p>} 
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullname" placeholder="Full Name" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="text" name="username" placeholder="Username" required />
                    <div className="gender-div">
                        <label className="gender">Gender:</label><br/>
                        <label className="radioBtn">
                            <input type="radio" name="gender" value="male" required /> Male
                        </label>
                        <label className="radioBtn">
                            <input type="radio" name="gender" value="female" /> Female
                        </label>
                        <label className="radioBtn">
                            <input type="radio" name="gender" value="other" /> Other
                        </label>
                    </div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        minLength="6" 
                        required 
                    />
                    <input 
                        type="password" 
                        name="confirm_password" 
                        placeholder="Confirm Password" 
                        minLength="6" 
                        required 
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <a href="/login" className="link">Already have an account?</a>
            </div>
        </div>
    );
};

export default SignUp;
