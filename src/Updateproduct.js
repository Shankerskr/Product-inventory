import React from 'react';
//import { Formik } from 'formik';
// import { useState } from 'react';
import { Navigate} from 'react-router-dom';
import Navbars from './Navbar';


class UpdateProduct extends React.Component {

   
    state={
        productName:"",
        quantity:"",
        price:"",
        productNameError:"",
        quantityError:"",
        priceError:"",
        description:"",
        descriptionError:"",
        manufacturer:"",
        manufacturerError:"",
        isUpdated:false

    }
    componentDidMount()
    {
        let IdLastIndex=window.location.pathname.lastIndexOf("/");
        let id=window.location.pathname.substring(IdLastIndex+1);
     
        fetch( `http://localhost:3000/products/${id}`).then(res =>
      res.json()).then(d => { 
       
        this.setState({productName:d.productName,quantity:d.quantity,price:d.price,description:d.description,manufacturer:d.manufacturer})
        
      });
    }

    render(){

 

    let handleSubmit = (e) => {
        this.setState({priceError:"",quantityError:"",productNameError:"",descriptionError:"",manufacturerError:""});

        e.preventDefault();
        let error = false;
        if (this.state.productName.length === 0) {
            
            this.setState({productNameError:"Quantity  is Required"});
            error = true;
        }
        if (this.state.quantity.length === 0) {
            
            this.setState({quantityError:"Quantity  is Required"});
            error = true;

        }
        if (this.state.price.length === 0) {
           
            this.setState({priceError:"Quantity  is Required"});
            error = true;
        }
        if(this.state.description.length===0)
        {
            this.setState({descriptionError:"Description is Required"});
            error=true;
        }
        if(this.state.manufacturer.length===0)
        {
            this.setState({manufacturerError:"manufacturer is Required"});
            error=true;
        }
        if (error) {
            return;
        }

        let formData = {
            productName: this.state.productName,
            manufacturer: this.state.manufacturer,
            description: this.state.description,
            quantity:this.state.quantity,
            price: this.state.price
        };
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        };
        let IdLastIndex=window.location.pathname.lastIndexOf("/");
        let id=window.location.pathname.substring(IdLastIndex+1);
        let fetchRes = fetch(`http://localhost:3000/products/${id}`, options);

        fetchRes.then(res =>

            res.json()).then(d => {
                console.log(d);
                this.setState({isUpdated:true});
                this.props.history.push("/home")
            });


    }
    let ValidateField = (e, fieldName) => {
        e.preventDefault();
        if (fieldName === "productName") {
            this.setState({productNameError:""});
            if (this.state.productName.length === 0) {

                
                this.setState({productNameError:"Quantity  is Required"});
            }
        }
        if (fieldName === "price") {
            this.setState({priceError:""});
            if (this.state.price.length === 0) {
               
                this.setState({priceError:"Price  is Required"});
            }
        }

        if (fieldName === 'quantity') {
            this.setState({quantityError:""});
            if (this.state.quantity.length === 0) {
                this.setState({quantityError:"Quantity  is Required"});
            }
        }
        if(fieldName==="description")
        {
            this.setState({descriptionError:""});
            if (this.state.description.length === 0) {
                this.setState({descriptionError:"Description  is Required"});
            }
        }
        if(fieldName==="manufacturer")
        {
            this.setState({manufacturerError:""});
            if (this.state.manufacturer.length === 0) {
                this.setState({manufacturerError:"Manufacturer is Required"});
            }
        }

    }
    if(this.state.isUpdated)
    {
        return (
            <Navigate to="/home" />
        )
    }

    return (
        <div>
            <Navbars/>
            <div>
                <h1>Update Product:</h1>
            </div>
            <br />

            <form onSubmit={e => { handleSubmit(e) }}>
            <h5 class="thicker">Product Name</h5>
                <input 

                    type="text"

                    name="productName"

                    onChange={(e) => this.setState({productName:e.target.value})}

                    value={this.state.productName}
                    onBlur={(e) => ValidateField(e, "productName")}

                />
                <label style={{ color: 'red' }}>{this.state.productNameError}</label>
              

                <br />
                <h5 class="thicker">Description</h5>
                <input

                    type="text"

                    name="description"

                    onChange={(e) => this.setState({description:e.target.value})}

                    value={this.state.description}
                    onBlur={(e) => ValidateField(e, "description")}
                    

                />
                <label style={{ color: 'red' }}>{this.state.descriptionError}</label>
                <br />
                <h5 class="thicker">Manufacturer</h5>
                <input

                    type="text"

                    name="manufacturer"

                    onChange={(e) => this.setState({manufacturer:e.target.value})}

                    onBlur={(e) => ValidateField(e, "manufacturer")}
                    value={this.state.manufacturer}

                />
                <label style={{ color: 'red' }}>{this.state.manufacturerError}</label>
                <br />
                <h5 class="thicker">Quantity</h5>
                <input

                    type="text"

                    name="quantity"

                    onChange={(e) => this.setState({quantity:e.target.value})}


                    onBlur={(e) => ValidateField(e, "quantity")}
                    value={this.state.quantity}

                />
                <label style={{ color: 'red' }}>{this.state.quantityError}</label>
                <br />
                <h5 class="thicker">Price</h5>
                <input

                    type="text"

                    name="price"

                    onChange={(e) => this.setState({price:e.target.value})}

                    onBlur={(e) => ValidateField(e, "price")}
                    value={this.state.price}

                />
                <label style={{ color: 'red' }}>{this.state.priceError}</label>
                <br />
                <button type="submit" className='submitButton'  >

                    Update Product

                </button>

            </form>
           


        </div>


    );


}
}

export default UpdateProduct;