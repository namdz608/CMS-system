import React, { Component } from 'react';
import './modal.scss'
import {  Modal } from 'reactstrap';
import {toast} from 'react-toastify'
import {uploadStatus} from '../../../services/userservices'

class ModalUser extends Component {
    constructor(props){
        super(props);
        this.state = {
			checked:false
        }
    }

    handleCheckboxChange=(event) =>{
        if(event.target.checked){this.setState({ checked:true })}
        else{this.setState({ checked:false })}
    }
    saveInfo=async()=>{
        
        let user=this.props.user
        console.log('check data',this.props.user)
        if(this.state.checked===true){
            let status=await uploadStatus({
                userId:user.user.id,
                categoryId:user.categoryId,
                contentHtml:user.contentHtml,
                contentMarkdown:user.contentMarkdown,
                files:user.files,
                firstName:user.user.firstName,
            })
            console.log('hello ',status)
            if(status.data.errCode===0){
              await  toast.success('upload success')               
            }

        }
        else{
          await  toast.error('You need to agreed the term to continue')
        }
    }
    render() {
       let{isOpen}=this.props
       console.log('check data',this.props.user)
        return (
            <><div>
                <Modal isOpen={isOpen}  className={'modal-container'} size="lg"centered>
                <div className="modal-content">
                            <div className="modal-header">
                                <span className="left">Key Terms by Apple</span>
                                <span className="right"onClick={this.props.CloseModal}><i className="fas fa-times"></i></span>
                            </div>
                            <div className="modal-body">
                                    <div>
                                        <h3>iOS</h3>
                                        <p>iOS is the name for your iPhone's operating system, like Windows on a PC. It was previously known as iPhone OS when Apple introduced the product in 2007, but it became iOS with the release of the iPhone 3G. You'll usually see it followed by the version number, like iOS 12 or iOS 11.3.1.</p>
                                    </div>
                                    <div>
                                        <h4> iCloud</h4>
                                        <p>The name of Apple's own internet-based data services. iCloud is an umbrella term used for all such technologies provided by Apple, including storage service iCloud Drive, password management system iCloud Keychain, iCloud Backup, and the web interface at iCloud.com (shown above). You'll probably need to buy some storage space if you want to use iCloud for anything serious.</p>
                                    </div>
                                    <div>
                                <h4>Apple Pay</h4>
                                <p>A proprietary payment system that uses card credentials stored in the iOS Wallet app. Simply open the app, tap Add Credit or Debit Card, and follow the instructions to add your card. This allows you to pay for items at point of sale terminals using your phone, but you can also use it to pay for items on your Mac too.</p>
                            </div>
                            <label>
                            <input type="checkbox"  value="checkbox" 
                                    onChange={(event)=>this.handleCheckboxChange(event)}/>I have read and agreed to the terms and conditions</label>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-booking"onClick={()=>this.saveInfo()}>Confirm</button>
                                <button className="btn-cancel"onClick={this.props.CloseModal}>Close</button>
                            </div>

                </div>      
                </Modal>  </div>   
            </>
        );
    }

}


export default ModalUser;
