import React from 'react';
import { NavLink } from 'react-router-dom';
const Dashboard = () => {
    return (
        <div>
            <div class="container-fluid mb-5">
                <div class="row">
                    <nav 
                    id="sidebarMenu"
                    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"/>
                    <div class="position-sticky pt-3">
                        <ul class="nav flex-cloumn">
                            <li class="nav-item">
                                <NavLink class="nav-link active" aria-current="page" to="#">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"></svg>
                                    
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;