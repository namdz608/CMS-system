import React, { Component } from "react";
import "./ViewStatus.scss";
import { withRouter } from "react-router";
import {
  getAllStatus,
  likeAndDis,
  postComment,
  getCommentDate,
} from "../services/userservices";
import { toast } from "react-toastify";
import Navbar from "../layouts/navbar/Navbar";
import Sidenav from "../layouts/sidenav/Sidenav.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PreviewIcon from "@mui/icons-material/Preview";
import PublicIcon from "@mui/icons-material/Public";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { saveAs } from "file-saver";
import ReactPaginate from "react-paginate";
import JSZip from "jszip";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import IconCheckboxes from "./widget/IconCheckBox";

var zip = require("jszip")();

class ViewStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      comment: "",
      hasSetStatus: [],
      user: this.props.location.state.state,
      start: "",
      end: "",
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
      anonymous: "normal",
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleCheckboxChange = (event) => {
    if (event.target.checked) {
      this.setState({ anonymous: "ano" });
    } else {
      this.setState({ anonymous: "normal" });
    }
  };

  async receivedData() {
    let data = await getAllStatus();
    let o = await getCommentDate();
    let status = data.data;
    this.setState({
      status: status,
      start: +o.data.data.startDate,
      end: +o.data.data.endDate,
    });
    const slice = this.state.status.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((item) => (
      <React.Fragment>
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
                  {item.createdAt}
                  <PublicIcon className="icon-date"></PublicIcon>
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
            <div className="preview">
              <PreviewIcon
                onClick={() => this.Test(item.files)}
                className="icon"
              />
              Preview file!
            </div>
            <br></br>
            {this.state.user.role === "QA Manager" && (
              <div className="download">
                <DownloadForOfflineIcon
                  onClick={() => this.getZip(item)}
                ></DownloadForOfflineIcon>
                Download File!
              </div>
            )}
          </div>

          {this.state.user.role === "Staff" && (
            <div className="idea-footer">
              <div className="likes" onClick={() => this.getLike(item.Reaction, item.id, item)}>
                <button
                  
                  disabled={
                    !!this.state.hasSetStatus.find((num) => num === item.id)
                  }
                >
                  <ThumbUpIcon className="icon"></ThumbUpIcon>
                </button>

                <p>{item.Reaction.like} likes</p>
              </div>
              <div className="likes" onClick={() => this.getDisLike(item.Reaction, item.id, item)}>
                <button
                  
                  disabled={
                    !!this.state.hasSetStatus.find((num) => num === item.id)
                  }
                >
                  <ThumbDownIcon className="icon">
                    {item.Reaction.dislike}
                  </ThumbDownIcon>
                </button>

                <p> {item.Reaction.dislike} dislikes</p>
              </div>
            </div>
          )}

          {this.state.user.role !== "Staff" && (
            <div className="idea-footer">
              <div className="likes">
                <button disabled="true">
                  <ThumbUpIcon className="icon"></ThumbUpIcon>
                </button>

                <p>{item.Reaction.like} likes</p>
              </div>
              <div className="likes">
                <button disabled="true">
                  <ThumbDownIcon className="icon">
                    {item.Reaction.dislike}
                  </ThumbDownIcon>
                </button>

                <p> {item.Reaction.dislike} dislikes</p>
              </div>
            </div>
          )}

          <div className="modal-comment">
            {this.state.user.role === "Staff" && (
              <div className="user-comment">
                <div className="avt-comment">
                  <img src={this.state.user.image} />
                </div>
                <input
                  className="input-comment"
                  type="text"
                  placeholder="  comment..."
                  onChange={(event) => this.handleComment(event)}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={() => this.handlePost(item)}
                >
                  Post
                </button>
              </div>
            )}
            <br />
            {item.Comments &&
              item.Comments.map((item, index) => {
                return (
                  <div className="comment-ideas">
                    <div className="avt-comment">
                      {item.state === "normal" && <img src={item.User.image} />}
                      {item.state === "ano" && (
                        <img src="https://content.fortune.com/wp-content/uploads/2022/04/Anonymous-Hacker-Group-Mask-GettyImages-1229478612.jpg" />
                      )}
                    </div>
                    <div className="comment-text">
                      {item.state === "normal" && (
                        <p className="user-cmt">
                          {item.User.firstName} {item.User.lastName}
                        </p>
                      )}
                      {item.state === "ano" && (
                        <p className="user-cmt">Anonymous</p>
                      )}
                      {item.comment}
                    </div>
                    <MoreHorizIcon className="comment-more"></MoreHorizIcon>
                  </div>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    ));

    this.setState({
      pageCount: Math.ceil(this.state.status.data.length / this.state.perPage),

      postData,
    });
  }
  handlePageClick = async (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  async componentDidMount() {
    await this.receivedData();
  }

  getZip = async (data) => {
    var zip = new JSZip();
    zip.file("Hello.txt", `${data.contentHtml}`);

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      saveAs(content, "example.zip");
    });
  };
  getLike = async (like, id, info) => {
    let likeNumber = like.like + 1;
    await likeAndDis({
      statusOwner: info.User.email,
      user: this.state.user.firstName,
      like: likeNumber,
      dislike: like.dislike,
      statusId: like.statusId,
      state: "liked",
    });

    this.setState({
      hasSetStatus: this.state.hasSetStatus.concat(id),
    });
    this.componentDidMount();
  };

  Test = async (data) => {
    if (data) {
      let a = await fetch(data);
      let res = await a.blob();
      let obj = URL.createObjectURL(res);
      window.open(obj);
    } else {
      alert("User did not upload files or images");
    }
  };

  checkValid = async () => {};

  getDisLike = async (data, id, info) => {
    let likeNumber = data.dislike + 1;
    await likeAndDis({
      statusOwner: info.User.email,
      user: this.state.user.firstName,
      like: data.like,
      dislike: likeNumber,
      statusId: data.statusId,
      state: "disliked",
    });
    this.setState({
      hasSetStatus: this.state.hasSetStatus.concat(id),
    });
    this.componentDidMount();
  };

  handleComment = (event) => {
    let a = event.target.value;
    this.setState({ comment: a });
  };

  handlePost = async (data) => {
    let c = new Date().getTime();
    if (this.state.start < c && c < this.state.end) {
      let a = await postComment({
        statusOwner: data.User.email,
        user: this.state.user.firstName,
        state: this.state.anonymous,
        comment: this.state.comment,
        userId: this.state.user.id,
        statusId: data.id,
      });
      if (a.data.errCode === 0) {
        toast.success("Post Comment successfully!");
      } else {
        toast.error("Please input cmt");
      }
      this.componentDidMount();
    } else {
      toast.error("Oops, you missed the deadline");
    }
  };

  render() {
    let { status } = this.state;
    return (
      <>
        <div className="view">
          <Sidenav></Sidenav>
          <div className="view-status">
            <Navbar></Navbar>
            {this.state.user.role==='Staff' &&
            <div className="sort">
              
                <form action="">
                  <label className="label-control">
                    <input type="checkbox" name="checkbox" value="checkbox"
                  onChange={(event) => this.handleCheckboxChange(event)} /> Comment Anonymously
                    
                  </label>
                </form>
              
            </div>
  }
            {/* <OutlineSelect></OutlineSelect> */}
            <div className="status-container">{this.state.postData}</div>

            <div className="pagination">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ViewStatus);
