import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Upload from './Upload';
import Uploadbrain from './Uploadbrain';
import Uploadheart from './Uploadheart';
// import { Button } from "@/components/ui/button"

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value });
    };

    const handleButtonClick = (buttonType) => {
        // Perform actions related to pixel streaming based on the button clicked
        console.log('Button Clicked: ${ buttonType }');
        window.location.href = '/Upload';
        // Add logic to connect to pixel streaming for lungs, brain, and heart
    };
    const brainhandleButtonClick = (buttonType) => {
        // Perform actions related to pixel streaming based on the button clicked
        console.log('Button Clicked: ${ buttonType }');
        window.location.href = '/Uploadbrain';
        // Add logic to connect to pixel streaming for lungs, brain, and heart
    };
    
    const hearthandleButtonClick = (buttonType) => {
        // Perform actions related to pixel streaming based on the button clicked
        console.log('Button Clicked: ${ buttonType }');
        window.location.href = '/Uploadheart';
        // Add logic to connect to pixel streaming for lungs, brain, and heart
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = user;
        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if (res.status === 400 || !res) {
                window.alert('Invalid Credentials');
            } else {
                // Render buttons for lungs, brain, and heart after successful login
                window.alert('Login Successful');

                document.getElementById('login-form').style.display = 'none';
                document.getElementById('button-container').style.display = 'flex';
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify content-center form">
                        <h1 className="display-4 fw-bolder">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">
                            Register
                        </NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">3D_VR Radiology</h1>
                        <form id="login-form" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    Remember me
                                </label>
                            </div>
                            <button type="submit" className="btn btn-secondary w-100 mt-4">
                                Submit
                            </button>
                        </form>
                        
                        
                        
                          
                        
                        <div id="button-container" style={{ display: 'none', marginTop: '20px'}}>
                            <button className="btn btn-success"
                                style={{ fontSize: '18px', marginRight: '10px' }}
                                onClick={() => handleButtonClick('lungs')}
                            >
                                Lungs
                            </button>
                            <button className="btn btn-success"
                                style={{ fontSize: '18px', marginRight: '10px' }}
                                onClick={() => brainhandleButtonClick('brain')}>
                                Brain
                            </button>
                            <button className="btn btn-success"
                                style={{ fontSize: '18px' }}
                                onClick={() => hearthandleButtonClick('heart')}>
                                Heart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;