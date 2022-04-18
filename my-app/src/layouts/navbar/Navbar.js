import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ListIcon from "@mui/icons-material/List";
import React, { Component } from "react";
import { withRouter } from "react-router";
class Navbar extends Component {
 

  render() {
    return (
      <>
        <div className="navbar-custom">
          <div className="wrapper">
            <div className="search">
              <input type="text" name="" id="" placeholder="Search..." />
              <SearchIcon></SearchIcon>
            </div>
            <div className="items">
              <div className="item">
                <PublicIcon className="icon"></PublicIcon>
                English
              </div>
              <div className="item">
                <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
              </div>
              <div className="item">
                <ListIcon></ListIcon>
              </div>
              <div className="item">
                <img src alt="" className="avatar" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
