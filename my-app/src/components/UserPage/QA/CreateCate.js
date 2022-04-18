import React, { Component } from "react";
import "./CreateCategory.scss";
import { handleCreateCategory } from "../../../services/userservices";
import { toast } from "react-toastify";
import {
  handleGetAllCategory,
  deleteCate,
} from "../../../services/userservices";
import Navbar from '../../../layouts/navbar/Navbar';
import Sidenav from '../../../layouts/sidenav/Sidenav';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: "",
      listCats: [],
    };
  }

  onChangeInput = (event) => {
    let a = event.target.value;
    this.setState({ cat: a });
  };

  SaveCategory = async () => {
    let res = await handleCreateCategory({
      categorytype: this.state.cat,
    });
    if (res.data.errCode === 0) {
      toast.success("Create category successfully");
      this.componentDidMount();
    } else {
      toast.error("Error creating category");
    }
  };

  async componentDidMount() {
    let data = await handleGetAllCategory();

    this.setState({
      listCats: data.data.data,
    });
    console.log("aaa", this.state.listCats);
  }

  handleDelete = async (data) => {
    await deleteCate(data.id);
    toast.success("Delete Success");
    this.componentDidMount();
  };
  render() {
    let { listCats } = this.state;
    return (
      <>
      <div className="cat">
        <Sidenav></Sidenav>
        <div className="cat-container">
          <Navbar></Navbar>
        <div className="top-cat">
            <h1>Manage categories</h1>
        </div>
        <div className="bottom-cat">
        <div className="container">
          <div className="row">
            <div className="col-12 form-group">
              {/* <label>New Category</label> */}
              <input
              placeholder="New Category..."
                className="cat-form"
                onChange={(event) => this.onChangeInput(event)}
                value={this.state.cat}
              />
              <button
            variant="contained" 
              className="btn btn-warning"
              onClick={() => this.SaveCategory()}
            >
             Create new
             <SaveIcon />
            </button>
            </div>
            
          </div>
          <div className="btn">
            
          </div>

          <div className="user-container">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {listCats &&
                  listCats.length > 0 &&
                  listCats.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.categorytype}</td>
                        <td>
                          <DeleteForeverIcon
                            className="btn-delete"
                            onClick={() => this.handleDelete(item)}
                            style={{textTransform: "capitalize"}}
                          >
                            Delete
                          </DeleteForeverIcon>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        </div>         
        </div>
      </>
    );
  }
}

export default CreateCategory;