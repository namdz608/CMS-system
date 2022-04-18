import React, { Component } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { getAllUser, getAllStatus } from "../../services/userservices";
import { withRouter } from "react-router";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      allUsers: [],
    };
  }

  async componentDidMount() {
    let a = await getAllStatus();
    let result = [];
    let z = await getAllUser();
    let b = a.data.data.map((item) => {
      let o = {};
      o.email = item.User.email;
      o.content = item.contentMarkdown;
      return o;
    });
    let c = a.data.data.map((item) => {
      return item.contentMarkdown;
    });
    let obj = {};
    obj.email = b;
    obj.contentMarkdown = c;
    // obj.files=d
    result.push(obj);
    this.setState({ user: b, allUsers: z.data });
  }

  render() {
    const header = [
      { label: "Email", key: "email" },
      { label: "Content", key: "contentMarkdown" },
      { label: "File", key: "files" },
    ];
    const a = this.state.user;
    const b = this.state.allUsers.user;
    const csvReport = {
      filename: "Report.csv",
      header: header,
      data: a,
    };

    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <div className="deleteButton">Delete</div>
            </div>
          );
        },
      },
    ];
    
    return (
      <div className="datatable">
        <div className="datatableTitle">Users List</div>
        <DataGrid
          className="datagrid"
          rows={b}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
        <div className="downloadButton">
          <button className="btn btn-warning">
            <CSVLink className="csv" {...csvReport}>Download CSV</CSVLink>
            <DownloadIcon></DownloadIcon>
          </button>
        </div>
      </div>
    );
  }
}

export default Datatable;
