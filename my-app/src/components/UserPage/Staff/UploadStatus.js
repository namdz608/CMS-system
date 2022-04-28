import React, { Component } from 'react';
import './UploadStatus.scss'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import {handleGetAllCategory,getStatusDate} from '../../../services/userservices'
import ModalUser from './Modal'
import { withRouter } from 'react-router';
import moment from 'moment';
import Sidenav from '../../../layouts/sidenav/Sidenav';
import {toast} from 'react-toastify'
import Navbar from '../../../layouts/navbar/Navbar';
import MdEditor from 'react-markdown-editor-lite';//https://www.npmjs.com/package/react-markdown-editor-lite
const mdParser = new MarkdownIt(/* Markdown-it options */);

class UploadStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
			contentMarkdown:'',
            contentHtml:'',
            category:'',//list category
            user:this.props.location.state.state,
            categoryId: '',
            isOpen:false,
            files:'',
            image:'',
            previewURLImg:'',
            userId:'',
            start:'',
            end:''
        }
    }
   

    getInfor=async()=>{
        let data= await handleGetAllCategory()      
            this.setState({
                category:data.data,
            })     
    }

    async componentDidMount(){
        await this.getInfor()
        let a=await getStatusDate()
        this.setState({
            start:+a.data.data.startDate,
            end:+a.data.data.endDate
        })
    }

    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHtml:html,
        })
        
     }

     handleChange =async (event) => {
        let data=event.target.files;
       let file=data[0];
        if(file){
            let base64 = await this.getBase64(file)
            let obj=URL.createObjectURL(file)
            this.setState({
                previewURLImg:obj,
                files:base64
            })
        }
      };

      getBase64=(file)=>{
        return new Promise((resolve, reject) => {
            const reader= new FileReader();
            reader.readAsDataURL(file);
            reader.onload= () =>resolve(reader.result);
            reader.onerror=error => reject(error)
        })
    }

     handleRadioChange=(event)=>{
        let a=event.target.value
        this.setState({
            categoryId:a
        })
     }

     openModal=()=>{
       if(!this.state.categoryId || !this.state.contentMarkdown){
         toast.error('Missing select category or content status')
       }
       else{
        let c=new Date()
        if(this.state.start<c && c<this.state.end){
            this.setState({
                isOpen:true
            })
        }
        else{
            alert('You miss it')
        }
       }
        
     }

     CloseModal=()=>{
         this.setState({
             isOpen:false
         })
     }

     handleOnClick=()=>{
        // if(this.state.obj.role==="QA Manager"){
     this.props.history.push('/view-status',{state:this.state.user})
        // }
        
     }
    render() {
      let{category}= this.state
      let copy={...this.state}
        return (
            <>
<div className="upload">
      <Sidenav></Sidenav>
      <div className="upload-container">
      <Navbar></Navbar>
      <div className="top-upload">
      <h3 data-text="Choose Your Language">Upload Ideas</h3>
      </div>

      <div className="bottom-upload">
      <div className="container-upload">
          <form>
            
            {category &&
              category.data.length > 0 &&
              category.data.map((item, index) => {
                return (
                  <>
                    <label data-text="JavaScript">

                      <input
                        type="radio"
                        onChange={(event) => this.handleRadioChange(event)}
                        name="language"
                        value={item.id}
                      />{" "}
                      {item.categorytype}
                      
                      <span className="dot"></span>
                      
                      <span className="dot-shadow"></span>
                    </label>
                  </>
                );
              })}
          </form>
          <div className="">
            <MdEditor
              style={{ height: "400px", width: "600px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
          <label className="file">
            <input
              type="file"
              id="file"
              aria-label="File browser example"
              onChange={(event) => this.handleChange(event)}
            />
            <span className="file-custom"></span>
          </label>
          <embed src={this.state.previewURLImg} width="300px" height="250px" />
        
            <button
              className="btn btn-warning"
              onClick={() => this.openModal()}
            >
             Save
            </button>
            
         
          <ModalUser
            CloseModal={this.CloseModal}
            isOpen={this.state.isOpen}
            user={copy}
          />
        </div>
      </div>
      
        </div>
      </div>
       
        
       
            </>
        );
    }

}


export default withRouter(UploadStatus);
