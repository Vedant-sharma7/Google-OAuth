import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/authService";
import "../styles/Dashboard.css";
import Loading from "../components/Loading";

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getCurrentUser();

                if (!data.success) {
                    navigate("/");
                    return;
                }

                setUser(data.user);
            } catch (err) {
                navigate("/");
            }
        }

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };

    if (!user) return <Loading />;

    return (
        <div className="dashboard-container">
            <div className="profile-card">

                <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="profile-image"
                />

                <h2>{user.name}</h2>

                <p>{user.email}</p>

                <div className="success-box">
                    ✅ Logged in with Google
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Dashboard;