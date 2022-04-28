import React from 'react';
import {Bar} from 'react-chartjs-2';
import {getAllStatus,getReactionDash} from '../../../services/userservices'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

const state = {
  
}

export default class DashBoard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      labels: [],
datasets: [
{
 label: 'Most Liked',
 backgroundColor: '#A09DE0',
 borderColor: 'rgba(0,0,0,1)',
 borderWidth: 0.5,
 data: [65, 59, 80, 81, 56]
},
],

    };

}
    async componentDidMount() {
      
      let a=await getReactionDash()
      
      let b=a.data.data.map(item => {
          return item.User.firstName
      })
      let c=a.data.data.map(item => {
          return item.Reaction.like
      })
      let dataset=[]
      let obj={}
      obj.label="Most Liked"
      obj.backgroundColor= '#A09DE0'
      obj.borderColor= 'rgba(0,0,0,1)'
      obj.borderWidth= 0.5
      obj.data= c
      dataset.push(obj)
      this.setState({
        labels:b,
        datasets:dataset
      })
    
    }

  render() {
    return (
      <div style={{width: "95%", height: "100%"}}>
        <Bar
          data={this.state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}
