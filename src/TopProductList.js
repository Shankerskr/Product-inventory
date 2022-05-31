import React from "react";
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import Navbars from './Navbar';
import './topProducts.css';
Chart.register(CategoryScale);

class TopProductList extends React.Component{

    state={
        data:{
            labels: [],
            datasets: [
            {
                label: 'Top Products',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
            }
            ]
        }
    }

    componentDidMount()
    {
        fetch("http://localhost:3000/products").then(res =>
      res.json()).then(d => {
          
        function sortByProperty(property){  
            return function(a,b){  
               if(a[property] > b[property])  
                  return 1;  
               else if(a[property] < b[property])  
                  return -1;  
           
               return 0;  
            }  
         }
         d.sort(sortByProperty("viewCount"));
         let lables=[];
         let viewCount=[];
         let top=10;
         for(let i=d.length-1;i>=0&&top>0;i--)
         {
             lables.push(d[i]["productName"]);
             viewCount.push(d[i]["viewCount"]);
             top--;
         }
        

            const allData= {
                labels: lables,
                datasets: [
                {
                    label: 'View Count',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: viewCount
                }
                ]
            }

        
            this.setState({ data:allData});
      });
    }
    

    render()
    {
    return(
        <div>
           <Navbars/>
           <div className="top-products">
           <Bar
          data={this.state.data}
         
          
          options={{
            title:{
              display:true,
              text:'Top Viewed products',
              fontSize:15
            },
            legend:{
              display:true,
              position:'right'
            }
          }
          
        }
       
        
        />
        </div>
        </div>
    );
        }
}
export default TopProductList;