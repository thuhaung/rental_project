import React from 'react'
import "./Footer.css"

function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer-general-section">
                <div className="footer-general-titles">
                    <p>Help</p>
                    <p>Fair Housing Guide</p>
                    <p>Terms of Use</p>
                    <p>Cookie Preference</p>
                </div>
                <div className="footer-general-copyright">
                    <p>@2022 Web App Project</p>
                </div>
            </div>
            <div className="footer-line"></div>
            <div className="footer-main-sections">
                <div className="footer-main-section">
                    <h3>Contact</h3>
                    <p>Thu Duc District, HCMC, VN</p>
                    <p>info@hcmiu.edu.vn</p>
                    <p>+84 90 0909 090</p>
                </div>
                <div className="footer-main-section">
                    <h3>About</h3>
                    <p>Product</p>
                    <p>Developer</p>
                    <p>Invest</p>
                </div>
                <div className="footer-main-section">
                    <h3>Support</h3>
                    <p>Help center</p>
                    <p>COVID-19 policies</p>
                    <p>Report a concern</p>
                </div>
                <div className="footer-main-section">
                    <h3>Community</h3>
                    <p>Facebook group</p>
                    <p>Learn about new features</p>
                    <p>Feedback</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
