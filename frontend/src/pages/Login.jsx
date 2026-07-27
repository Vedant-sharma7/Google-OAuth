import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUser() {
            try {
                const data = await getCurrentUser();

                if (data.success) {
                    navigate("/dashboard");
                }
            } catch (error) {
                console.log("User not logged in.");
            }
        }

        checkUser();
    }, [navigate]);

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Google OAuth</h1>

                <p>
                    Sign in securely using your Google account.
                </p>

                <button
                    className="google-btn"
                    onClick={handleGoogleLogin}
                >
                    Continue with Google
                </button>

            </div>

        </div>
    );
}

export default Login;