import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

// Create Context
export const AuthContext = createContext(initialState);

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
};

// Provider Component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            // Set auth token header usually done here or in api call
        } else {
            dispatch({ type: 'AUTH_ERROR' });
            return;
        }

        try {
            const res = await fetch('/api/user', {
                headers: {
                    'x-auth-token': localStorage.token
                }
            });
            const data = await res.json();

            if (res.ok) {
                dispatch({
                    type: 'USER_LOADED',
                    payload: data
                });
            } else {
                dispatch({ type: 'AUTH_ERROR' });
            }
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    // Register User
    const register = async formData => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: data
                });
                loadUser(); // Load user immediately after registration success
            } else {
                // handle error (could update state with error message)
                console.error(data.msg);
                dispatch({ type: 'REGISTER_FAIL' });
            }

        } catch (err) {
            dispatch({ type: 'REGISTER_FAIL' });
        }
    };

    // Login User
    const login = async formData => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: data
                });
                loadUser();
            } else {
                console.error(data.msg);
                dispatch({ type: 'LOGIN_FAIL' });
            }
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL' });
        }
    };

    // Logout
    const logout = () => dispatch({ type: 'LOGOUT' });

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
