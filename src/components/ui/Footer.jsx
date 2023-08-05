import React from 'react';

export const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <a href="https://github.com/danield413"><i className="fab fa-github"></i> Mi Github</a>
                <p><strong>Daniel Díaz Castro</strong> {new Date().getFullYear()} ©</p>
            </div>
        </footer>
    )
}
