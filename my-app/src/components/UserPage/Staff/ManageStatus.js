import React, { Component } from 'react';
import './ManageStatus.scss'
import {toast} from 'react-toastify'
import {uploadStatus,getUserStatus} from '../../../services/userservices'
import Sidenav from '../../../layouts/sidenav/Sidenav';
import Navbar from '../../../layouts/navbar/Navbar';
import PublicIcon from '@mui/icons-material/Public';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
class ManageStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:this.props.location.state.state,
            status: [],
            hasSetStatus: [],
        }
    }

   async componentDidMount(){
    let id= this.props.match.params.id;
       let a =await getUserStatus(id)
       console.log('???',a.data.status)
       this.setState({
           status: a.data.status
       })
   }

   Test=async(data)=>{
    if(data){
     let a= await fetch(data)
     let res= await a.blob()
     let obj=URL.createObjectURL(res)
     window.open(obj);
    }
 else{
     alert("User did not upload files or images")
 }
}
    render() {
      let{status} = this.state
        return (
            <>
                <div className="view">
          <Sidenav></Sidenav>
          <div className="view-status">
            <Navbar></Navbar>
            <div className="sort">
              {/* <select
                className="select"
                labelId="demo-simple-select-label"
                onChange={(event) => this.onChangeInput(event, "sort")}
              >
                <SortIcon></SortIcon> 
                <option> Sort by Date</option>
                <option>Sort by Most liked</option>
                <option>Sort by Most disliked</option>
              </select> */}
            </div>
            {/* <OutlineSelect></OutlineSelect> */}
            <div className="status-container">
              {status &&
                status.map((item, index) => {
                  return (
                    <div className="modal-content">
                      <div className="modal-header">
                        <b>Category: {item.Category.categorytype}</b>
                      </div>
                      <div className="modal-body">
                        <div className="idea-header">
                          <div className="avt">
                            <img src={item.User.image} />
                          </div>
                          <div className="user-account">
                            {item.User.lastName} {item.User.firstName}
                            <br />
                            <div className="date-created">
                              23th March 2022 21:00 <PublicIcon className="icon-date"></PublicIcon>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="price">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.contentHtml,
                            }}
                          ></div>
                        </div>
                        <div className="preview" onClick={() => this.Test(item.files)}>
                        <PreviewIcon
                          
                          className="icon"
                        />
                        Preview file!
                        </div>
                        <br></br>
                        
                      </div>
                      <DownloadIcon className="preview" onClick={()=>this.getZip(item.files)}>Hi</DownloadIcon>
                      Download file!           
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
            </>
        );
    }

}


export default ManageStatus;
