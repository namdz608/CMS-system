import Sidenav from "../../../../layouts/sidenav/Sidenav";
import Navbar from "../../../../layouts/navbar/Navbar";
import "./home.scss";
import Widget from "../../../widget/Widget";
import Featured from "../../../featured/Featured";
import Chart from "../../../chart/Chart";
import DashBoard from "../Dashboard";
import PieChart from "../../../chart/Piechart";



const Home = () => {
  return (
    <div className="home">
      <Sidenav />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="idea" />
      
        </div>
        <div className="listContainer">
        <div className="pieChart">
          <div className="listTitle">Like vs Dislike</div>
          <PieChart ></PieChart>
          
           
        </div>
        <div className="barChart">
        <div className="listTitle">The most liked user</div>
            <DashBoard></DashBoard>
            </div>
        </div>
        
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months Posts" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          
         
        </div>
        
      </div>
    </div>
  );
};

export default Home;
