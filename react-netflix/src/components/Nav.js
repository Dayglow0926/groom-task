import React, { useEffect, useState } from "react";
import netflixLogo from "../assets/icon/netflix_logo.png";
import userLogged from "../assets/icon/login_avatar.png";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show ? "nav__black" : ""}`}>
      <Link to={"/"} className="nav__logo-link">
        <img src={netflixLogo} alt="Netflix logo" className="nav__logo" />
      </Link>

      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요."
      />

      <img src={userLogged} alt="User logged" className="nav__avatar" />
    </nav>
  );
}

export default Nav;
