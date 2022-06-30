import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
    const [formValue, setFormValue] = useState({
        loginEmail: "",
        loginPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInput = (e) => {
        setFormValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (!formValue.loginEmail.trim() || !formValue.loginPassword.trim())
            return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(
                auth,
                formValue.loginEmail,
                formValue.loginPassword
            );
            navigate("/");
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };
    return (
        <div className="wrapper">
            <form className="form-box" onSubmit={handleSubmitForm}>
                <h3 className="title">Login</h3>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter email..."
                        name="loginEmail"
                        value={formValue.loginEmail}
                        onChange={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password..."
                        name="loginPassword"
                        value={formValue.loginPassword}
                        onChange={handleInput}
                    />
                </div>
                {!loading ? (
                    <button className="submit" type="submit">
                        Login
                    </button>
                ) : (
                    <button className="submit disabled">...Login</button>
                )}
                <p className="text-link">
                    Don't have any account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
