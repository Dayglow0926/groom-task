import React, { useEffect, useState } from "react";
import netflixLogo from "../assets/icon/netflix_logo.png";
import userLogged from "../assets/icon/login_avatar.png";
import "./Nav.css";

function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav className={`nav ${show ? "nav__black" : ""}`}>
      <img
        src={netflixLogo}
        alt="Netflix logo"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <img src={userLogged} alt="User logged" className="nav__avatar" />
    </nav>
  );
}

export default Nav;
