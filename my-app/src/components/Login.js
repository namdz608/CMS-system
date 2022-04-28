import React, { Component } from 'react';
import './Login.scss'
import {handleLoginApi} from '../services/userservices'
import { withRouter } from 'react-router';
import {toast} from 'react-toastify'
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
			password:'',
        }
    }

    onChangeInput=(event,id)=>{
		

			let copyState={...this.state}
			copyState[id]=event.target.value
			this.setState({...copyState})

    }
    
    handleLogin=async()=>{
		let data=  await handleLoginApi(this.state.email, this.state.password)
		console.log(data)
		if(data && data.data.errCode===0){
				this.props.history.push('/Qa-manager-homepage',{state:data.data.user})			
		}
		else{
			toast.error('User name or password is incorrect')
		}
	}
    render() {
       let {email,password} = this.state
        return (
            <>
             <div className="login-wrap">
	<div className="login-html">
		<input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" className="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab"></label>
		<div className="login-form">
			<div className="sign-in-htm">
				<div className="group">
					<label for="user" className="label">Username</label>
					<input id="user" type="text" className="input"value={email}onChange={(event)=>this.onChangeInput(event,'email')}/>
				</div>
				<div className="group">
					<label for="pass" className="label">Password</label>
					<input id="pass" type="password" className="input" data-type="password"value={password}onChange={(event)=>this.onChangeInput(event,'password')}/>
				</div>
				
				<div className="group">
					<button className="button" value="Sign In"onClick={()=>this.handleLogin()}>Log In</button>
				</div>
				<div className="hr"></div>
				<div className="foot-lnk">
					<a href="#forgot">Forgot Password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
            </>
        );
    }

}


export default withRouter(Login);
