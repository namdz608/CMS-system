import React, { Component } from "react";

import { toast } from "react-toastify";
import {
getAllUser,getAllStatus
} from "./services/userservices";

import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { withRouter } from 'react-router';
import { CSVLink } from 'react-csv';



export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 130,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 130,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "role",
    headerName: "Role",
    width: 230,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
// export class userRows extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user:[],
//       allUsers:[]
//     };
//   }

//   async componentDidMount(){
//       let a= await getAllStatus()
//       let result=[]
//       let z= await getAllUser()
//       let b=a.data.data.map(item=>{
//         let o={}
//         o.email=item.User.email
//         o.content=item.contentMarkdown
//         return o
//       })
//       let c=a.data.data.map(item=>{
//         return item.contentMarkdown
//       })
//       let d=a.data.data.map(item=>{
//         return item.files
//       })
//       let obj={}
//       obj.email=b
//       obj.contentMarkdown=c
//       // obj.files=d
//       result.push(obj)
//       this.setState({user:b,allUsers:z.data});
//   }
// }
//temporary data
export const userRows = [
  {
    id: 1,
    username: "Hung1",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Hung2",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "asd",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "asds",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "231",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "fd",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Yoi",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Hung",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
