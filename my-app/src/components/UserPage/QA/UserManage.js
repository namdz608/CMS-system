import React, { Component } from "react";
import "./UserManage.scss";
import { toast } from "react-toastify";
import {
getAllUser,getAllStatus
} from "../../../services/userservices";
import Navbar from "../../../layouts/navbar/Navbar";
import SideNav from '../../../layouts/sidenav/Sidenav'
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { withRouter } from 'react-router';
import { CSVLink } from 'react-csv';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[],
      allUsers:[]
    };
  }

  async componentDidMount(){
      let a= await getAllStatus()
      let result=[]
      let z= await getAllUser()
      let b=a.data.data.map(item=>{
        let o={}
        o.email=item.User.email
        o.content=item.contentMarkdown
        return o
      })
      let c=a.data.data.map(item=>{
        return item.contentMarkdown
      })
      let d=a.data.data.map(item=>{
        return item.files
      })
      let obj={}
      obj.email=b
      obj.contentMarkdown=c
      // obj.files=d
      result.push(obj)
      this.setState({user:b,allUsers:z.data});
  }

  
  render() {
    const header=[{label:'Email',key:'email'},
                {label:'Content',key:'contentMarkdown'},
                {label:'File',key:'files'}]
    const a=this.state.user
    const csvReport={
        filename:'Report.csv',
        header:header,
        data:a
    }
    const b=this.state.allUsers.user
    console.log('mm',b)
    return (
      <>
      <div><button className="btn btn-warning"><CSVLink {...csvReport}>Hi</CSVLink></button>
      <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
        {b && b.map(item=>{
          return(
            
             <tr>
      <th scope="row">{item.id}</th>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td><button class="btn btn-warning" >Delete</button></td>
    </tr>
            
          )
        })}
         
      
    

    
  </tbody>
</table>
       </div>
      </>
    );
  }
}

export default withRouter(UserManage);