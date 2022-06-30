import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";

function Register() {
    const [formValue, setFormValue] = useState({
        registerUsername: "",
        registerEmail: "",
        registerPassword: "",
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
        if (
            !formValue.registerUsername.trim() ||
            !formValue.registerEmail.trim() ||
            !formValue.registerPassword.trim()
        )
            return;

        try {
            setLoading(true);
            const result = await createUserWithEmailAndPassword(
                auth,
                formValue.registerEmail,
                formValue.registerPassword
            );
            const docRef = doc(db, "users", result.user.uid);
            await setDoc(docRef, {
                displayName: formValue.registerUsername,
                email: formValue.registerEmail,
                createAt: serverTimestamp(),
            });
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
                <h3 className="title">Register</h3>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter username..."
                        name="registerUsername"
                        value={formValue.registerUsername}
                        onChange={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter email..."
                        name="registerEmail"
                        value={formValue.registerEmail}
                        onChange={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password..."
                        name="registerPassword"
                        value={formValue.registerPassword}
                        onChange={handleInput}
                    />
                </div>
                {!loading ? (
                    <button className="submit" type="submit">
                        Register
                    </button>
                ) : (
                    <button className="submit disabled">...Creating</button>
                )}
                <p className="text-link">
                    Already have an account <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
