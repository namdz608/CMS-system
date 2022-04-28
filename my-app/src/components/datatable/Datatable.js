import React, { Component } from "react";
import "./datatable.scss";
import { getAllUser, deleteUser } from "../../services/userservices";
import {toast} from 'react-toastify'
class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      allUsers: [],
    };
  }
  deleteUser=async(userId)=>{
    await deleteUser(userId)
    toast.success('delete user successfully')
    this.componentDidMount()
  }

  async componentDidMount() {
    let z = await getAllUser();
    this.setState({  allUsers: z.data });
  }

  render() {
    const b = this.state.allUsers.user;
    
    
    return (
      
      <div className="datatable">
        <div className="datatableTitle"><h1>Users List</h1></div>
        <div className="user-list">
        <table class="table table-striped">
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
    {b && b.map((item,index)=>{
      return(
      <tr>
      <th scope="row">{item.id}</th>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td><button className="btn btn-warning"onClick={()=>this.deleteUser(item.id)}>Delete</button></td>
    </tr>
      )
    })}
    
  </tbody>
</table>
        <div className="downloadButton">
        </div>
      </div>
      </div>
    );
  }
}

export default Datatable;
