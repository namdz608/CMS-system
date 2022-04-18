import React, { Component } from 'react';
import './deadline.scss'
import { withRouter } from 'react-router';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import moment from "moment";
import {setStatusDate,setCommentDate} from "../../../services/userservices"
import {toast} from 'react-toastify';
import Navbar from "../../../layouts/navbar/Navbar.js";
import Sidenav from "../../../layouts/sidenav/Sidenav.js";
class SetDeadLine extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            end:new Date(),
            dateCMt:new Date(),
            endCmt: new Date(),
        }
    }

    setCommentDate=async()=>{
      let d=new Date(this.state.dateCMt).getTime()
      let e=new Date(this.state.endCmt).getTime()
      if(d<e){
        let data=await setCommentDate({
          startDate:d,
          endDate:e
        })
        if(data.data.errCode===0){
          toast.success('Set date successfully')
        }
      }
      else{
        toast.error('startDate must lower than endDate')
      }
      
    }

    SaveDeadLine=async()=>{
      let  a=new Date(this.state.date).getTime()
      let  b=new Date(this.state.end).getTime()  
      // const current=moment().startOf('day').format('DD-MMM-YYYY HH:mm:ss')
      // const start=moment(a).endOf('day').format('DD-MMM-YYYY HH:mm:ss')
      // const end=moment(b).endOf('day').format('DD-MMM-YYYY HH:mm:ss')
      if(a<b){
        let data=await setStatusDate({
          startDate:a,
          endDate:b
        })
        if(data.data.errCode===0){
          console.log('aaaa',a)
          toast.success('Set date successfully')
        }
      }
      else{
        toast.error('startDate must lower than endDate')
      }
    }
    
    render() {
        const { date,end, dateCMt, endCmt } = this.state;

        return (
            <>
                   <div className="deadline">
          <Sidenav/>
          <div className="deadline-container">
            <Navbar></Navbar>
            <div className="deadline-top">
              <h1> Set Deadlines For Idea</h1>
            </div>
            <div className="deadline-time">
              <div className="left">
                <h2>Ideas's Deadline</h2>
                
                <br />
                <label htmlFor="">Starting Date</label>
                <br />
                <Flatpickr
                  label="Starting Date"
                  value={date}
                  className="time"
                  onChange={(date) => {
                    this.setState({ date });
                  }}
                />
               <br />

                <label htmlFor="">Ending Date</label>
                <br />
                <Flatpickr
                  value={end}
                  className="time"
                  onChange={(end) => {
                    this.setState({ end });
                  }}
                />
                <br />
                <br />

                <button
                  className="btn btn-warning"
                  onClick={() => this.SaveDeadLine()}
                >
                  Save Ideas
                </button>
              </div>
               
              <div className="right">
              <h2>Comment's Deadline</h2>
              <br />
                <label htmlFor="">Starting Date</label>
                <br />
                <Flatpickr
                  value={dateCMt}
                  className="time"
                  onChange={(dateCMt) => {
                    this.setState({ dateCMt });
                  }}
                />
              
             <br />

              <label htmlFor="">Ending Date</label>
              <br />
              <Flatpickr
                value={endCmt}
                className="time"
                onChange={(endCmt) => {
                  this.setState({ endCmt });
                }}
              />
             
             <br />
                <br />
                <button
                  class="btn btn-warning"
                  onClick={() => this.setCommentDate()}
                >
                  Save Comment
                </button>

                
              </div>
            </div>
          </div>
        </div>
            </>
        );
    }

}


export default withRouter(SetDeadLine);
