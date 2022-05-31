import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect } from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Navbars  from "./Navbar";
import './ProductList.css';


class Productlist extends React.Component {

  state = {
    Productlist: [],
    popupEnabled: false,
    popupData: {},
    isAuthenticated:false,
    checkedState:[],
    multipleDelete:false
  }
  componentDidMount() {
    let isAuthenticated=false;
    if(localStorage.getItem("userId"))
    {
      isAuthenticated=true;
    }
    fetch("http://localhost:3000/products").then(res =>
      res.json()).then(d => {
        console.log(d);
        
        this.setState({ Productlist: d ,isAuthenticated:isAuthenticated,checkedState:new Array(d.length).fill(false)});
      });
  }


  render() {

    const deleteProduct = (e, id) => {
      e.preventDefault();
      let options = {
        method: 'DELETE',
        headers: {
          'Content-Type':
            'application/json;charset=utf-8'
        }
      };
      let fetchRes = fetch(`http://localhost:3000/products/${id}`, options);
      let remainingData = this.state.Productlist.filter((ele) => {
        if (ele.id !== id) return true;
      });
      this.setState({ Productlist: remainingData });
    }


    const showProduct = async(e, id) => {
      e.preventDefault();

      let data = this.state.Productlist.filter((e) => {
        e.viewCount=e.viewCount+1;
        if (e.id == id) return true;
      });
     
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(data[0])
    };
      let fetchRes =await  fetch(`http://localhost:3000/products/${id}`, options);
      this.setState({ popupData: data[0], popupEnabled: true });

    }
    const closeProduct = (e) => {
      e.preventDefault();

      this.setState({ popupEnabled: false, popupData: [] })


    }
    const searchproducts = async (e) => {
      e.preventDefault();
      let fetchRes = await fetch(`http://localhost:3000/products/?q=${e.target.value}`);
      let data = await fetchRes.json();
      this.setState({ Productlist: data })

    }
    const handleChange=(e,i)=>{
      
      
      const updatedCheckedState = this.state.checkedState.map((item, index) =>
      {
            if( index === i) 
            {
              item=!item;
            }
            return item;
      }
    );
    
   let trueCount=0;
   for(let i=0;i<updatedCheckedState.length;i++)
   {
     if(updatedCheckedState[i])trueCount++;
   }

      this.setState({checkedState:updatedCheckedState,Productlist:this.state.Productlist,multipleDelete:trueCount>1});
      
      
    }

    const deleteMultipleProducts=async (e)=>{
   
      console.log("deleted clikced");
      console.log(this.state.checkedState);
      let options = {
        method: 'DELETE',
        headers: {
          'Content-Type':
            'application/json;charset=utf-8'
        }
      };

     let remainingData=await  this.state.Productlist.filter( (e,index)=>{

        if(this.state.checkedState[index])
        {
          console.log(e.id)
          fetch(`http://localhost:3000/products/${e.id}`, options).then(()=>{});
          return false;
        }
        return true;
      });
      
      
      this.setState({Productlist:[...remainingData],checkedState:[],multipleDelete:false});
      

    }

    return (
      <div>
        {/* <h2>Product List</h2> */}
        {
          this.state.popupEnabled ? (
            <div className="popup" >
              <div className="popup-data">
                <div>
                  <span className="bold">ProductName :</span>
                  <span>{this.state.popupData.productName}</span>

                </div>
                <div>
                  <span className="bold">Description :</span>
                  <span>{this.state.popupData.description}</span>

                </div>
                <div>
                  <span className="bold">Manufacturer :</span>
                  <span>{this.state.popupData.manufacturer}</span>


                </div>
                <div>
                  <span className="bold">Qauntity :</span>
                  <span>{this.state.popupData.quantity}</span>

                </div>
                <div>
                  <span className="bold">Price :</span>
                  <span>{this.state.popupData.price}</span>

                </div>
                <div className="no-border">
                  <button className="btn delete-btn" onClick={(f) => closeProduct(f)}>close</button>

                </div>


              </div>
            </div>
          ) : ""
        }

        <div className="top-box">

          <div> <Link className={`btn btn-primary ${this.state.isAuthenticated}`} to="/Addproduct">{this.state.isAuthenticated?"AddProduct":""}</Link></div>
          <div> <button className={`btn btn-primary delete-btn ${this.state.isAuthenticated && this.state.multipleDelete}`}  onClick={deleteMultipleProducts}>{this.state.isAuthenticated && this.state.multipleDelete?"Delete Selected Products":""}</button></div>
          
          <div class="search-box">

            <input type="search" onChange={e => searchproducts(e)} class="search-box-input" placeholder="search  product names" />

          </div>

        </div>
        <br />
        <div class="list-group product-list" >
          <div className="product-list-item">
            <div>
              <div className="product-list-item-in">
              <div className="bold">Select Multiple</div>
                <div className="bold">product name</div>
                <div className="bold">description</div>

                <div className="bold">quantity</div>
                <div className="bold">manufacturer</div>

                <div></div>
                <div></div>

              </div>
            </div>
          </div>

          {
            this.state.Productlist.map((e,index) => {

              return (
                <div className="product-list-item" >
                  <div>
                 
                    <div className="product-list-item-in" >

                    <div>  
                    <input type="checkbox"  value={index} onChange={(e) => handleChange(e,index)} checked={this.state.checkedState[index]}/>
                </div> 
                      <div onClick={(f) => showProduct(f, e.id)}>{e.productName}</div>
                      <div>{e.description}</div>

                      <div>{e.quantity}</div>
                      <div>{e.manufacturer}</div>

                     
                      <div><Link className={`btn update-btn ${this.state.isAuthenticated && !this.state.multipleDelete}`} to={`/UpdateProduct/${e.id}`}>{this.state.isAuthenticated && !this.state.multipleDelete?"update":""}</Link></div>
                      <div><button className={`btn delete-btn ${this.state.isAuthenticated && !this.state.multipleDelete}`} onClick={(f) => deleteProduct(f, e.id)}>{this.state.isAuthenticated && !this.state.multipleDelete?"delete":""}</button></div>
                    </div>
                  </div>

                </div>
              );

            })
          }



        </div>

      </div>
    )
  }
}
export default Productlist;

