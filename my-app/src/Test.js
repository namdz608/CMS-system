import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {getAllUser} from './services/userservices'

export default class Opp extends Component {
  constructor(props) {
      super(props);
      this.state = {
          offset: 0,
          data: [],
          perPage: 2,
          currentPage: 0,
          o:[]
      };
      this.handlePageClick = this
          .handlePageClick
          .bind(this);
  }
 async receivedData() { 
    let a=await getAllUser()
    this.setState({
        o:a.data.user
    })
              const slice = this.state.o.slice(this.state.offset, this.state.offset + this.state.perPage)
              const postData = slice.map(pd => <React.Fragment>
                  <p>{pd.firstName}---{pd.email}</p>
                  
              </React.Fragment>)

              this.setState({
                  pageCount: Math.ceil(this.state.o.length / this.state.perPage),
                 
                  postData
              })
          
  }
  handlePageClick = async(e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;

      this.setState({
          currentPage: selectedPage,
          offset: offset
      }, () => {
          this.receivedData()
      });

  };

 async componentDidMount() {
     
      let a=await getAllUser()
    console.log('?a',a.data.user)
    
   await this.receivedData()
  }
  render() {
      return (
          <div>
              {this.state.postData}
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
                  activeClassName={"active"}/>
          </div>

      )
  }
}
