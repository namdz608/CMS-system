import React, { Component } from 'react';
import './QA.scss'
import { withRouter } from 'react-router';
import Navbar from "../../../layouts/navbar/Navbar";
import SideNav from '../../../layouts/sidenav/Sidenav'
import {getAllUser, getAllStatus} from '../../../services/userservices'
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
class QaManager extends Component {
    constructor(props){
        super(props);
        this.state = {
			obj:this.props.location.state.state,
      user: [],
      allUsers: [],
        }
    }

    onChangeInput=(event,id)=>{
        let copyState={...this.state}
        copyState[id]=event.target.value
        this.setState({...copyState})
    }
   async componentDidMount(){
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

    handleOnClick=()=>{
       // if(this.state.obj.role==="QA Manager"){
 this.props.history.push('/upload-status',{state:this.state.obj})
       // }
       
    }
    render() {
       let {obj} = this.state
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
        return (
            <>
            <div className="profile">
              <SideNav></SideNav>
              <div className="profile-cotainer">
                <Navbar></Navbar>
                <div className="top-profile">
                  <h1>Profile Information</h1>
                </div>
                <div className="bottom-profile">
                  <div className="left-container">
                    <img src={obj.image} alt="" />
                    <br />
                    <hr />
                    <h2>{obj.firstName}</h2>
                  </div>
                  <div className="right-container">
                    <h1>User's Information</h1>
                    <hr />
                    <div className="user-info">
                      <div className="left-info">
                        <h2>Full Name:</h2>
                        <h2>Email:</h2>
                        <h2>Role:</h2>
                      </div>
    
                      <div className="right-info">
                        <p>
                          {obj.firstName} {obj.lastName}
                        </p>
                        <p>{obj.email}</p>
                        <p>{obj.role}</p>
                        {this.state.obj.role==='Staff' &&
                                                <button
                                                className="btn btn-warning"
                                                onClick={() => this.handleOnClick()}
                                              >
                                                Upload ideas
                                              </button>
                        }
                        {this.state.obj.role==='QA Manager'&&
                                            <div className="downloadButton">
                                            <button className="btn btn-warning">
                                              <CSVLink className="csv" {...csvReport}>Download CSV</CSVLink>
                                              <DownloadIcon></DownloadIcon>
                                            </button>
                                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }

}


export default withRouter(QaManager);
