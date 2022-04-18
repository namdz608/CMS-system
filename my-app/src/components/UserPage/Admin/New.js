import React, { Component } from "react";
import { createNewUser } from "../../../services/userservices";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "./new.scss";
import Navbar from "../../../layouts/navbar/Navbar";
import Sidenav from "../../../layouts/sidenav/Sidenav";
import SendIcon from "@mui/icons-material/Send";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { withRouter } from 'react-router';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      lastName: "",
      password: "",
      role: "",
      image: "",
      previewURLImg: "",
    };
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }; //https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

  handleImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await this.getBase64(file);
      let obj = URL.createObjectURL(file);
      this.setState({
        previewURLImg: obj,
        image: base64,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  checkValid = () => {
    let isValid = true;
    let arrIp = ["email", "password", "firstName", "lastName", "role"];
    for (let i = 0; i < arrIp.length; i++) {
      if (!this.state[arrIp[i]]) {
        isValid = false;
        alert("missing parameter " + arrIp[i]);
        break;
      }
    }
    return isValid;
  };
  componentDidMount() {}

  handleSave = async () => {
    let isValid = this.checkValid();

    if (isValid === true) {
      let res = await createNewUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        image: this.state.image,
      });
      console.log(res.data.errCode);
      if (res && res.data.errCode === 0) {
        toast.success("Add new User successfully");
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          image: "",
          previewURLImg: "",
        });
      } else {
        toast.error("Failed");
      }
    }
  };

  render() {
    let { firstName, lastName, email, password } = this.state;
    console.log('?',this.props.location.state.state)
    return (
      <>
        <div className="new">
          <Sidenav
          user={this.props.location.state.state}
          />
          <div className="new-container">
            <Navbar></Navbar>
            <div className="top-new">
              <h1>Add new User</h1>
            </div>
            <div className="bottom-new">
              <div className="left-container">
                <div className="preview-img-container">
                  <input
                    id="preview"
                    type="file"
                    hidden
                    onChange={(event) => this.handleImg(event)}
                    placeholder="Image"
                  />
  <div className="previewImage"style={{backgroundImage:`url(${this.state.previewURLImg})`}}></div>
                </div>
              </div>
              <div className="right-container">
                <form action="">
                  <div className="form-input">
                    <label htmlFor="preview">
                      Image:{" "}
                      <DriveFolderUploadIcon className="icon"></DriveFolderUploadIcon>
                    </label>
                    <input
                      type="file"
                      id="file"
                      name=""
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="form-input">
                    <label>Email</label>
                    <input
                      type="email"
                      className=""
                      value={email}
                      onChange={(event) => this.onChangeInput(event, "email")}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-input">
                    <label>Password</label>
                    <input
                      type="password"
                      className=""
                      value={password}
                      onChange={(event) =>
                        this.onChangeInput(event, "password")
                      }
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-input">
                    <label>First Name</label>
                    <input
                      type="text"
                      className=""
                      value={firstName}
                      onChange={(event) =>
                        this.onChangeInput(event, "firstName")
                      }
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-input">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className=""
                      value={lastName}
                      onChange={(event) =>
                        this.onChangeInput(event, "lastName")
                      }
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-input">
                  <label id="demo-simple-select-label">Role</label>
                    <select className="select"
                      labelId="demo-simple-select-label"
                      onChange={(event) => this.onChangeInput(event, "role")}
                    >
                      <option >Admin</option>
                      <option>QA Manager</option>
                      <option>Staff</option>
                      <option>QA Coordinator</option>
                    </select>
                  </div>
                  <button className="btn btn-warning"onClick={() => this.handleSave()} type="button">Save</button>
                </form>
              </div>
            </div>
          </div>
          <center>
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </center>
        </div>
      </>
    );
  }
}

export default withRouter(New);
