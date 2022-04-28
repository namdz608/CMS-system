import React, { Component } from "react";
import {Pie} from "react-chartjs-2";



export default class PieChart extends React.Component {
    state = {
        status: []
    };

    async componentDidMount(){
        const url = "https://staff-idea-cms.herokuapp.com/api/dashboard-reaction";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({status: data.data});
        console.log();
    }



    render() {
        const sum = this.state.status.map(item => item.Reaction.like).reduce((prev, curr) => prev + curr, 0)
        const sum2 = this.state.status.map(item => item.Reaction.dislike).reduce((prev, curr) => prev + curr, 0)
        const data = {
            labels: ["Dislikes", "Likes"], 
            datasets: [{
              data: [sum2,sum],
              backgroundColor: ["#A09DE0", "#80AAB0"]
          
            }]
          }
        return (
                <div  style={{width: "95%", height: "100%"}}>
                <Pie data={data}/>
                </div>
        )
    }

}