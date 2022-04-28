import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login'
import QaManager from './components/UserPage/QA/QaManager'
import UploadStatus from './components/UserPage/Staff/UploadStatus';
import "react-toastify/dist/ReactToastify.css"
import CreateCategory from './components/UserPage/QA/CreateCate'
import { ToastContainer } from 'react-toastify';
import ViewStatus from './components/ViewStatus';
import New from './components/UserPage/Admin/New';
import SetDeadLine from './components/UserPage/Admin/SetDeadLine'
import UserManage from './components/UserPage/QA/UserManage'
import ManageStatus from './components/UserPage/Staff/ManageStatus'
import Opp from './Test'
import DashBoard from './components/UserPage/Admin/Dashboard';
import Home from './components/UserPage/Admin/home/Home';
import List from './components/List'
import LikeList from './components/UserPage/Admin/LikeList'

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/create-user" component={New}/>
      <Route path="/Qa-manager-homepage" component={QaManager}/>
      <Route path="/upload-status" component={UploadStatus}/>
      <Route path="/manage-category" component={CreateCategory}/>
      <Route path="/view-status" component={ViewStatus}/>
      <Route path="/set-deadline" component={SetDeadLine}/>
      <Route path="/all-users" component={UserManage}/>
      <Route path="/manage-status/:id" component={ManageStatus}/>
      <Route path="/dashboard" component={DashBoard}/>
      <Route path="/home" component={Home}/> 
      <Route path="/list" component={List}/>
      <Route path="/likelist" component={LikeList}/>
    </Switch>
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
  </div>
  );
}

export default App;
