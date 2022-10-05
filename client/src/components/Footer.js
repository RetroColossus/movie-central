import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope, FaFolder } from "react-icons/fa";

const AppFooter = () => {
    return (
        <>
            <Container fluid className="text-light page-footer d-flex pt-3 bg-dark">
                <Container>
                    <h5 className='pt-4'></h5>
                    <div className="d-lg-flex pb-4 justify-content-between">
                        
                        
                       
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>© 2022</p>
                        <p>
                            <a className="footer-link" href="">
                                <span className="pr-3">
                                    <FaGithub />
                                </span>
                               
                            </a>
                        </p>
                    </div>
                </Container>
            </Container>
        </>
    )
};
export default AppFooter;