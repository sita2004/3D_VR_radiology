import React from 'react';
import About from './About';
import Contact from './Contact';
import Services from './Services';
// import Footer from './Footer';
import { NavLink } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <h1 className="display-4 fw-bolder mb-4 text-center text-white">Feel better about finding healthcare</h1>
                            {/* <img src="/assests/human_parts.jpg" alt="About" className="w-100 h-50 "/>  */}
                            <p className="lead text-center fs-4 mb-5 text-white">Embrace the future of medical imaging and diagnosis. Join our community of users benefiting from advanced healthcare solutions.</p>
                            <div className="buttons d-flex justify-content-center">
                                <NavLink to="/contact" className="btn btn-light me-4 rounded-pill px-4 py-2">Get Quote</NavLink>
                                <NavLink to="/Services" className="btn btn-outline-light rounded-pill px-4 py-2">Our Features</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <About/>
            <Services/>
            <Contact/>
            
        </div>
    );
}
export default Home;