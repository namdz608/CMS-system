
import "./sidenav.scss";
import React, { Component } from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
class Sidenav extends Component {

  handleOnClick=()=>{
    // if(this.state.obj.role==="QA Manager"){
this.props.history.push('/view-status',{state:this.props.location.state.state})
    // }
    
 }
 handleManageStatus=()=>{
  this.props.history.push(`/manage-status/${this.props.location.state.state.id}`,{state:this.props.location.state.state})
 }

 handleProfile=()=>{
  this.props.history.push('/Qa-manager-homepage',{state:this.props.location.state.state})
 }

 manageCat=()=>{
  this.props.history.push('/manage-category',{state:this.props.location.state.state})
 }

 addUser=()=>{
  this.props.history.push('/create-user',{state:this.props.location.state.state})
 }

 addDeadline=()=>{
  this.props.history.push('/set-deadline',{state:this.props.location.state.state})
 }
 handleDashboard=()=>{
  this.props.history.push('/dashboard',{state:this.props.location.state.state})
 }
 manageUsers=()=>{
  this.props.history.push('/all-users',{state:this.props.location.state.state})
 }

 manageHome=()=>{
  this.props.history.push('/home',{state:this.props.location.state.state})
 }

 userList=()=>{
  this.props.history.push('/list',{state:this.props.location.state.state})
 }

render() {
  let a=this.props.location.state.state.role
  console.log('render',a)
  return (
    <div className="sidenav">
      <div className="top">
      <Link to="/" style={{textDecoration: "none"}}>
        <span className="logo">Staff's Ideas</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title-nav">MAIN</p>
          {a && a==='QA Manager' &&
                    <li onClick={()=>this.manageHome()}>
                    <DashboardIcon className="icon"/>
                    <span  >DashBoard</span>
                  </li>
          }

          <li onClick={()=>this.handleOnClick()}>
            <LightbulbOutlinedIcon className="icon"></LightbulbOutlinedIcon>
            <span >View Ideas</span>
          </li>
          <p className="title-nav">USEFUL</p>
          {a && a==='QA Manager' && <>
          <li onClick={()=>this.manageCat()}>        
          <CategoryIcon className="icon"/>
            <span >Manage Category</span>         
          </li>
          </>}  
          {a && a==='Admin' && <>
          <li onClick={()=>this.userList()}>
            <PersonIcon className="icon"></PersonIcon>
            <span >Users</span>
          </li>
          </>  }    
          {a && a==='Admin' && <>
          <li onClick={()=>this.addUser()}>
              <GroupAddIcon className="icon"></GroupAddIcon>
            <span >Add new users</span> 
                   
          </li>
          <li onClick={()=>this.addDeadline()}>
            <MoreTimeOutlinedIcon className="icon"></MoreTimeOutlinedIcon>
            <span >Add Ideas Deadline</span>
          </li></>}
          {a && a==='Staff' &&
                    <li>          
                    <SettingsIcon className="icon"></SettingsIcon>
                    <span onClick={()=>this.handleManageStatus()}>Manage Status</span>
                  </li>
          }
          <p className="title-nav">USER</p>
          <li onClick={()=>this.handleProfile()}>

            <AccountCircleIcon className="icon"></AccountCircleIcon>
            <span >Profile</span>
            
          </li>

          <li>
          <Link to="/" style={{textDecoration: "none"}}>
            <ExitToAppIcon className="icon"></ExitToAppIcon>
            <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="color-option"></div>
        <div className="color-option"></div>
        <div className="color-option"></div>
      </div>
    </div>
  );
}
}
export default withRouter(Sidenav);
