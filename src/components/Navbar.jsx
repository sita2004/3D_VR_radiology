// import React from 'react';
// import { NavLink } from 'react-router-dom';
// const Navbar=(auth)=>{
//     return (
//         <div>
//            <nav class="navbar navbar-expand-lg navbar-light shadow">
//   <div class="container">

//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//         <li class="nav-item">
//           <NavLink class="nav-link active" aria-current="page" to="/">Home</NavLink>
//         </li>
//         <li class="nav-item">
//           <NavLink class="nav-link" to="/about">About</NavLink>
//         </li>
//         <li class="nav-item">
//           <NavLink class="nav-link" to="/Services">Features</NavLink>
//         </li>
//         <li class="nav-item">
//           <NavLink class="nav-link" to="/contact">Contact</NavLink>
//         </li>
//         </ul>

        
//       <NavLink class="navbar-brand fw-bolder fs-4 mx-auto" to="/">HealthCare</NavLink>
//       {auth? (
//       <>
//       <NavLink to="/login" className="btn btn-outline-secondary ms-auto px-4 rounded-pill"><i className="fa fa-sign-in me-2"></i>Login</NavLink>
//       <NavLink to="/register" className="btn btn-outline-secondary ms-2 px-4 rounded-pill">Register</NavLink>
//       </>
//        ) :(
//       <>
//       <NavLink to="/dashboard" className="btn btn-outline-primary ms-2 px-4 rounded-pill">Dashboard</NavLink>
//       <NavLink to="/logout" className="btn btn-outline-primary ms-2 px-4 rounded-pill">Logout</NavLink>
//       </>
//       )}
//       <form class="d-flex" role="search">

//         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//         <button class="btn btn-outline-success" type="submit">Search</button>
//       </form>
//     </div>
//   </div>
// </nav>
//         </div>
//     );
// }
// export default Navbar;


// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      {/* Second Navbar (Top) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="d-flex align-items-center">
            {/* Circular image for 3D VR Radiology on the left */}
            <div className="rounded-circle overflow-hidden me-3" style={{ width: '50px', height: '50px' }}>
              <img src="https://c8.alamy.com/comp/MJB9RH/blue-icon-button-heart-beat-with-heart-symbol-healthcare-pharma-MJB9RH.jpg" alt="Health Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* 3D VR Radiology text on the left */}
            <span className="navbar-brand fw-bolder fs-4">3D VR Radiology</span>
          </div>
          <div className="d-flex align-items-center ms-auto">
            {/* Larger email symbol image */}
            <div className="rounded-circle overflow-hidden me-2" style={{ width: '60px', height: '60px' }}>
              <img src="https://previews.123rf.com/images/friendesigns/friendesigns1606/friendesigns160600580/58326329-logo-envelope-mail-address-icon-message-newsletter-symbol-vector.jpg" alt="Email Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* "Mail Us" text above */}
            <div className="me-2">
              <span className="d-block">Mail Us</span>
              {/* Email address below */}
              <span className="d-block">3dvrradiology@gmail.com</span>
            </div>

            {/* Larger phone symbol image */}
            <div className="rounded-circle overflow-hidden me-2" style={{ width: '60px', height: '60px' }}>
              <img src="https://w7.pngwing.com/pngs/193/250/png-transparent-blue-phone-inside-circle-icon-telephone-call-symbol-smartphone-ringing-phone-miscellaneous-blue-text.png" alt="Phone Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* "Call Us" text above */}
            <div>
              <span className="d-block">Call Us</span>
              {/* Phone number below */}
              <span className="d-block">Your Phone Number</span>
            </div>
          </div>
          {/* Remove the ul and li elements for Page 1 and Page 2 */}
        </div>
      </nav>

      {/* First Navbar (Bottom) */}
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container">
          <div className="d-flex align-items-center">
            {/* Remove the circular image and text for 3D VR Radiology */}
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              {/* Add NavLink for "About" */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              {/* Add NavLink for "Features" */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/features">Features</NavLink>
              </li>
              {/* Add NavLink for "Login" */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              {/* Add NavLink for "Register" */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
              
              {/* ... (rest of the items for the first navbar) */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;