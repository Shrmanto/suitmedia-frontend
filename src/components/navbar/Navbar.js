import React, { useEffect, useState } from 'react';
import suitmediaLogo from '../../assets/suitmedialogo.png';
import '../navbar/Navbar.css'

const Navbar = ()=> {
    const [scrollingDown, setScrollingDown] = useState(false);

    useEffect(() => {
        let prevScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setScrollingDown(currentScrollY > prevScrollY);

            prevScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`navbar navbar-expand-lg fixed-top ${scrollingDown ? 'hidden' : 'show'}`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/#">
                        <img src={suitmediaLogo} alt='' width={125}></img>
                    </a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/#">Work</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/#" style={{ color: 'white' }}>Ideas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">Careers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;