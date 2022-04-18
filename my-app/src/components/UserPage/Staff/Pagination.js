import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props){
        super(props);
        this.state = {
            postPerPage:'',
            totalPost:'',
            pageNumber:[]
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.totalPost!==this.props.totalPost ){
            let a=this.props.totalPost
            this.setState({totalPost:a})
            const pageNumber=[]
    for(let i=0;i<=Math.ceil(a/3);i++){
        pageNumber.push(i)
    }
    this.setState({
        pageNumber: pageNumber
    })
            console.log('ooo',this.state.pageNumber)
        } 
        if(prevProps.postPerPage!==this.props.postPerPage){
            let b=this.props.postPerPage
            console.log('hhh',b)
        }
    }

    abc=(number)=>{
        this.props.paginate(number)
        console.log("$$$",number)
    }
    render() {
        let a=this.props.totalPost
        console.log('oi k',a)
        return (
            <div>
                 <nav>
                <ul className="pagination">
                     {this.state.pageNumber.map(number=>{
                         return(
                            <li key={number} className="page-item">
                            <a onClick={() => this.abc(number)} className="page-link">{number}</a>
                        </li>
                         )
                    })}
                </ul>
            </nav>
            </div>
        )
    }
}
// const Pagination=({postPerPage,totalPost})=>{
//     const pageNumber=[]
//     for(let i=0;i<=Math.ceil(totalPost/postPerPage);i++){
//         pageNumber.push(i)
//     }
//     return(
        
//             <nav>
//                 <ul className="pagination">
//                     {pageNumber.map(number=>{
//                         <li key={number} className="page-item">
//                             <a href="!#" className="page-link">{number}</a>
//                         </li>
//                     })}
//                 </ul>
//             </nav>
//     )
// }
export default Pagination