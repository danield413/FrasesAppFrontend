import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { startLogout } from "../../actions/auth";

export const Navbar = () => {

  const dispatch = useDispatch();
  const {name} = useSelector(state => state.auth)

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch( startLogout() )
  }

  return (
    <>
      <nav className="navbar">
        <motion.div className="logo-header" whileTap={{scale:1.1}}>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <i className="fas fa-user-astronaut"></i>
            Daniel Díaz
          </Link>
        </motion.div>
        <motion.div className="menu-icon" onClick={handleClick} whileTap={{scale:1.2}}>
          {!click ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}
        </motion.div>
        <ul className={click ? "nav-menu active-link" : "nav-menu"}>
          <motion.li className="nav-item" whileTap={{scale:1.1}}>
            <Link
              to="/"
              className={
                pathname === "/" ? "nav-links active-link" : "nav-links"
              }
              onClick={closeMobileMenu}
            >
              Inicio
            </Link>
          </motion.li>
          <motion.li className="nav-item" whileTap={{scale:1.1}}>
            <Link
              to="/my-account"
              className={
                pathname === "/my-account" ? "nav-links user active-link" : "nav-links user"
              }
              onClick={closeMobileMenu}
            >
               <i className="fas fa-user-circle logo-icon"></i>
               {name}
            </Link>
          </motion.li>
          <motion.li className="nav-item" whileTap={{scale:1.1}}>
            <button className="nav-button" onClick={ handleLogout }>
            <i className="fas fa-sign-out-alt"></i>
            </button>
          </motion.li>
        </ul>
      </nav>
      <div className={click ? "responsive-menu show" : "responsive-menu"}>
        <div className="menu-head">
          <div className="logo">
            <i className="fas fa-user-circle logo-icon"></i>
            <span> {name}</span>
          </div>
        </div>
        <div className="menu-body">
          <ul>
            <motion.li className="nav-items-responsive" whileTap={{scale:1.3}}>
              <Link
                to="/"
                className="nav-links-responsive"
                onClick={closeMobileMenu}
              >
                Inicio
              </Link>
            </motion.li>
            <motion.li className="nav-items-responsive" whileTap={{scale:1.3}}>
              <Link
                to="/my-account"
                className="nav-links-responsive"
                onClick={closeMobileMenu}
              >
                Mi cuenta
              </Link>
            </motion.li>
            <motion.li className="nav-items-responsive" whileTap={{scale:1.4}}>
              <button className="nav-button-responsive" onClick={ handleLogout } >Cerrar Sesión</button>
            </motion.li>
            <motion.li className="nav-items-responsive" whileTap={{scale:1.4}} >
              <p className="love">Made with ❤️ by Daniel Díaz</p>
            </motion.li>
          </ul>
        </div>
      </div>
    </>
  );
};
