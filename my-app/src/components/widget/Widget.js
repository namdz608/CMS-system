import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Widget = ({ type }) => {
  const [user, setUser] = useState([]);
  const [idea, setIdea] = useState([]);
  useEffect(async() => {
    
    const respone = await fetch ('https://staff-idea-cms.herokuapp.com/api/get-all-users');
    const data =await respone.json();
    const item = data.user;
    setUser(item);
  }, [])

  useEffect(async() => {
    const respone = await fetch ('https://staff-idea-cms.herokuapp.com/api/get-all-status');
    const data =await respone.json();
    const item = data.data;
    setIdea(item);
    
  }, [])

  // const userToRender = this.state.user.filter(item => item.display)
  let data;
  const amount = user.length;
  const amountIdea = idea.length;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        
        link: "See all users",
        amount: user.length,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "idea":
      data = {
        title: "IDEAS",
        isMoney: false,
        link: "View all ideas",
        amount: idea.length,
        icon: (
          <LightbulbOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
       
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.amount} 
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
