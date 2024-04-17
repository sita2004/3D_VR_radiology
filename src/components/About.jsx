import React from 'react';
const About = () => {
    return (
        <div>
           <section id="about">
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="col-md-6">
                            {/* <img src="/assests/about1.jpeg.jpeg" alt="About" className="w-75 mt-5"/> */}
                            <img src="/assests/heart,brain,lung.jpg" alt="About" className="w-75 mt-5"/>
                           
                        </div>
                        <div className="col-md-6">
                            
                            {/* <h3 className="fs-5 mb-0">About Us</h3> */}
                            <h3 className="fs-5 mb-0">Unlocking Advanced Diagnostics</h3>
                            {/* <h1 className="display-6 mb-2">Who <b>We</b> Are</h1> */}
                            <h1 className="display-6 mb-2">A User's Handbook for<b> our </b>Website </h1>
                            <hr className="w-100"/>
                            {/* <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, cum aliquam vitae rerum ab eligendi, ut ipsum repellendus tempora veniam quod, odit neque accusamus. Quod vero est possimus quas magni. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae illum nemo reiciendis saepe repellendus delectus, quia error sequi cum odit accusantium voluptas ad! Aliquam, similique.</p> */}
                            <div>
  {/* <h2 className="mb-4">Welcome to [Your Website Name]: Your Personalized Medical Imaging Portal</h2> */}

  <p className="lead">
    Follow these steps to make the most of your experience on our website:
  </p>

  <ol className="lead">
    <li>User Authentication:
      <ul>
        <li>Begin by logging into your user account using the provided credentials.</li>
        <li>If you don't have an account, kindly sign up to access our services.</li>
      </ul>
    </li>

    <li>Upload Your X-Ray Image:
      <ul>
        <li>Once logged in, navigate to the upload section.</li>
        <li>Select and upload your X-ray image securely.</li>
        <li>Ensure the image adheres to the specified format guidelines.</li>
      </ul>
    </li>

    <li>Analyze Your X-Ray File in 3D:
      <ul>
        <li>Experience cutting-edge technology by allowing us to process and analyze your uploaded X-ray.</li>
        <li>Explore your diagnostic results presented in a state-of-the-art 3D visualization.</li>
      </ul>
    </li>

    {/* <li>Join Us Now! */}
      {/* <ul> */}
        {/* <li>Embrace the future of medical imaging and diagnosis.</li> */}
        {/* <li>Join our community of users benefiting from advanced healthcare solutions.</li> */}
      {/* </ul> */}
    {/* </li> */}
  </ol>
</div>

                            <button className="btn btn-secondary rounded-pill px-4 py-2">Get Started</button>
                            <button className="btn btn-secondary rounded-pill px-4 py-2 ms-2">Contact Us</button>
                        </div>
                    </div>
                </div>
            </section> 
        </div>
    )
}
export default About;