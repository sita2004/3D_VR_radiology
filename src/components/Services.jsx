import React from 'react';
const Services = () =>{
    return (
        <div>
            <section id="services">
                <div className="container my-5 py-5">
                    <div className="row mt-5">
                        <div className="col-12">
                            {/* <h3 className="fs-5 text-center mb-0">Our Services</h3> */}
                            <h3 className="fs-5 text-center mb-0">Our Features</h3>
                            <h1 className="display-6 text-center mb-4">Our <b>Awesome</b> Features</h1>
                            <hr className="w-25 mx-auto"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        <div class="card p-3 border-0">
  <div class="card-body text-center">
    {/* <i className="fa fa-cogs fa-4x mb-4 text-primary"></i> */}
    {/* <h5 class="card-title mb-3 fs-4 fw-bold">Highly Customizable</h5> */}
    <i className="fa fa-user fa-4x mb-4 text-info"></i> 
    




    <h5 class="card-title mb-3 fs-4 fw-bold">Patient Data Management</h5> 
    {/* <p class="card-text lead">Some quick example text to build on the card title and make up the bulk of the card's content. */}
    <p class="card-text lead"> Include features for adding, updating, and deleting patient records securely.
    </p>
    
  </div>
</div>
                        </div>
                        <div className="col-md-4">
                        <div class="card p-3 border-0">
  <div class="card-body text-center">
    {/* <i className="fa fa-mobile fa-4x mb-4 text-primary"></i> */}
    <i className="fa fa-eye fa-4x mb-4 text-success"></i> 
    

    {/* <h5 class="card-title mb-3 fs-4 fw-bold">Fully Responsive Layout</h5> */}
    <h5 class="card-title mb-3 fs-4 fw-bold">Medical Imaging Viewer</h5>
    {/* <p class="card-text lead">Some quick example text to build on the card title and make up the bulk of the card's content. */}
    <p class="card-text lead">Allow users to interact with and manipulate 3D images in a virtual environment.
    </p>
    
  </div>
</div>
                        </div>
                        <div className="col-md-4">
                        <div class="card p-3 border-0">
  <div class="card-body text-center">
    {/* <i className="fa fa-users fa-4x mb-4 text-primary"></i> */}
    <i className="fa fa-stethoscope fa-4x mb-4 text-info"></i>

    {/* <h5 class="card-title mb-3 fs-4 fw-bold">Users Experience</h5> */}
    <h5 class="card-title mb-3 fs-4 fw-bold">Diagnosis and Reporting</h5> 
    {/* <p class="card-text lead">Some quick example text to build on the card title and make up the bulk of the card's content. */}
    <p class="card-text lead">Enable radiologists to analyze images and generate diagnostic reports.
    </p>
    
  </div>
</div>
                        </div>
                        <div className="col-md-4">
                        <div class="card p-3 border-0">
  <div class="card-body text-center">
    {/* <i className="fa fa-laptop fa-4x mb-4 text-primary"></i> */}
    <i className="fa fa-lock fa-4x mb-4 text-warning"></i>

    {/* <h5 class="card-title mb-3 fs-4 fw-bold">Creative Web Design</h5> */}
    <h5 class="card-title mb-3 fs-4 fw-bold">User Authentication and Authorization</h5>
    <p class="card-text lead">Implement secure user authentication and authorization.
    </p>
    
  </div>
</div>
                        </div>
                        <div className="col-md-4">
                        <div class="card p-3 border-0">
  <div class="card-body text-center">
    {/* <i className="fa fa-file-code-o fa-4x mb-4 text-primary"></i> */}
    <i className="fa fa-users fa-4x mb-4 text-primary"></i> 
    {/* <i className="fa fa-vr-cardboard fa-4x mb-4 text-primary"></i> */}


    {/* <h5 class="card-title mb-3 fs-4 fw-bold">Unique and clean</h5> */}
    <h5 class="card-title mb-3 fs-4 fw-bold">Virtual Reality (VR) Integration</h5>
    <p class="card-text lead">Allow users to navigate through 3D images using VR devices.
    </p>
    
  </div>
</div>
                        </div>
                        <div className="col-md-4">
                        <div class="card p-3 border-0">
  <div class="card-body text-center">
    {/* <i className="fa fa-star-half-o fa-4x mb-4 text-primary"></i> */}
    {/* <h5 class="card-title mb-3 fs-4 fw-bold">Creative Ideas</h5> */}
    <i className="fa fa-search fa-4x mb-4 text-secondary"></i>

    <h5 class="card-title mb-3 fs-4 fw-bold">Audit Trail and Logging</h5>
    <p class="card-text lead">Implement logging for system activities
    </p>
    
  </div>
</div>
                        </div>
                        </div>
                        
                    </div>
            </section>
            </div>
    );
}
export default Services;