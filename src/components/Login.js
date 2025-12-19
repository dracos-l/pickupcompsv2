import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const authContext = useContext(AuthContext);
    const { login, isAuthenticated } = authContext;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login({ email, password });
    };

    if (isAuthenticated) {
        navigate('/Profile');
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={onSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;
