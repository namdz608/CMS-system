import React, { Component } from "react";
import "../../datatable/datatable.scss";
import { withRouter } from "react-router";
import {
    getReactionDash,
} from "../../../services/userservices";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../datatablesource";
import Sidenav from "../../../layouts/sidenav/Sidenav";
import Navbar from "../../../layouts/navbar/Navbar";


export default class LikeList extends React.Component {
    state = {
        status: []
    };

    async componentDidMount(){
        const url = "https://staff-idea-cms.herokuapp.com/api/dashboard-reaction";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({status: data.data});
        console.log();
    }
   

    render() {
        const userColumns = [
            { field: "id", headerName: "ID", width: 70 },
            { field: "firstName", headerName: "First Name", width: 240 },
            { field: "lastName", headerName: "Last Name", width: 240 },
            { field: "email", headerName: "Email", width: 240 },
            { field: "like", headerName: "Like", width: 240 },
            { field: "dislike", headerName: "Dislike", width: 240 },
           
        ];
        const count = 0;
        const sum = this.state.status.map(item => item.Reaction.like).reduce((prev, curr) => prev + curr, 0)
        const sum2 = this.state.status.map(item => item.Reaction.dislike).reduce((prev, curr) => prev + curr, 0)
    return (
        <div className="likelist">
        <Sidenav></Sidenav>
       <div className="list-cont">
           <Navbar></Navbar>
           <div className="likelist-top">
              <h1> List of Popular Ideas</h1>
            </div>
           <div className="bottom-cont">
        <div className="datatable">
          {/* <div className="datatableTitle">Most post that are liked</div> */}
          <div style={{ height: 400, width: '100%' }}>

          <DataGrid
            className="datagrid"
            rows={this.state.status.map((item,index) => (
                {
                    id: item.id,
                    firstName: item.User.firstName,
                    lastName: item.User.lastName,
                    email: item.User.email,
                    like: item.Reaction.like,
                    dislike: item.Reaction.dislike

                }
            ))}
            columns={userColumns.concat()}
            pageSize={9}
            rowsPerPageOptions={[9]}
           
          />
          </div>
        </div>
        </div>
        </div>
        </div>
      );
}
}


