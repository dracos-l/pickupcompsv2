import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const authContext = useContext(AuthContext);
    const { user, isAuthenticated, loading, logout } = authContext;
    const navigate = useNavigate();
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate('/Login');
        }

        const fetchAttempts = async () => {
            if (user) {
                try {
                    const res = await fetch('/api/user/attempts', {
                        headers: {
                            'x-auth-token': localStorage.getItem('token')
                        }
                    });
                    const data = await res.json();
                    setAttempts(data);
                } catch (err) {
                    console.error("Error fetching attempts", err);
                }
            }
        };

        fetchAttempts();
    }, [isAuthenticated, loading, navigate, user]);

    if (loading || !user) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Welcome, {user.username}</h2>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                    <button className="btn btn-danger" onClick={() => { logout(); navigate('/'); }}>Logout</button>
                </div>
            </div>

            <h3>Your History</h3>
            {attempts.length === 0 ? (
                <p>No attempts saved yet.</p>
            ) : (
                <div className="list-group">
                    {attempts.map(attempt => (
                        <div key={attempt._id} className="list-group-item">
                            <h5 className="mb-1">Result: {attempt.result ? JSON.stringify(attempt.result).substring(0, 50) + "..." : "N/A"}</h5>
                            <small>{new Date(attempt.date).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
