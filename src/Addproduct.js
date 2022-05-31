import React from 'react';
//import { Formik } from 'formik';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Home from './Home';
import Navbars from './Navbar';
import { useNavigate } from "react-router-dom";
function Addproducts(Props) {

    let [productName, setProductName] = useState("");
    let [quantity, setQuantity] = useState("");
    let [price, setPrice] = useState("");
    let [productNameError, setProductNameError] = useState("");
    let [quantityError, setQuantityError] = useState("");
    let [priceError, setPriceError] = useState("");
    let [description,setDescription]=useState("");
    let [manufacturer,setManufacturer]=useState("");
    let [descriptionError,setDescriptionError]=useState("");
    let [manufacturerError,setManufacturerError]=useState("");
    let navigate=useNavigate();

    let handleSubmit = (e) => {
        setPriceError("");
        setQuantityError("");
        setProductNameError("");
        setDescriptionError("");
        setManufacturerError("");
        e.preventDefault();
        let error = false;
        if (productName.length === 0) {
            setProductNameError("Product Name is Required");
            error = true;
        }
        if (quantity.length === 0) {
            setQuantityError("Quantity  is Required");
            error = true;

        }
        if (price.length === 0) {
            setPriceError("Price  is Required");
            error = true;
        }
        if(description.length===0)
        {
            setDescriptionError("Description is Rzequired");
        }
        if(manufacturer.length===0)
        {
            setManufacturerError("Manufacturer is Required");
        }
        if (error) {
            return;
        }
        
        let formData = {
            productName: productName,
            quantity: quantity,
            price: price,
            description:description,
            manufacturer:manufacturer,
            
            viewCount:0
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        };
        let fetchRes = fetch("http://localhost:3000/products", options);

        fetchRes.then(res =>

            res.json()).then(d => {
                console.log(d);
                navigate("/home")
            });


    }
    let ValidateField = (e, fieldName) => {
        e.preventDefault();
        if (fieldName === "productName") {
            setProductNameError("");
            if (productName.length === 0) {

                setProductNameError("Product Name is Required");

            }
        }
        if (fieldName === "price") {
            setPriceError("");
            if (price.length === 0) {
                setPriceError("Price  is Required");
            }
        }

        if (fieldName === 'quantity') {
            setQuantityError("");
            if (quantity.length === 0) {
                setQuantityError("Quantity  is Required");
            }
        }
        if(fieldName==="description")
        {
            setDescriptionError("");
            if(description.length===0)
            {
                setDescriptionError("Description is Rzequired");
            }
        }
        if(fieldName==="manufacturer")
        {
            setManufacturerError("");
            if(manufacturer.length===0)
            {
                setManufacturerError("Manufacturer is Required");
            }
        }

    }

    return (
        <div>
            <Navbars/>
            <div>
                <h1 class="thicker">Add Product:</h1>
            </div>
            <br />

            <form onSubmit={e => { handleSubmit(e) }}>
                <h5 class="thicker">ProductName</h5>
                <input

                    type="text"

                    name="productName"

                    onChange={(e) => setProductName(e.target.value)}

                    value={productName}
                    onBlur={(e) => ValidateField(e, "productName")}

                />
                <label style={{ color: 'red' }}>{productNameError}</label>
                <br />
                <h5 class="thicker">Description</h5>
                <input

                    type="text"

                    name="description"

                    onChange={(e) => setDescription(e.target.value)}


                    onBlur={(e) => ValidateField(e, "description")}
                    value={description}

                />
                <label style={{ color: 'red' }}>{descriptionError}</label>
                <br />
                <h5 class="thicker">Manufacturer</h5>
                <input

                    type="text"

                    name="manufacturer"

                    onChange={(e) => setManufacturer(e.target.value)}

                    onBlur={(e) => ValidateField(e, "manufacturer")}
                    value={manufacturer}

                />
                <label style={{ color: 'red' }}>{manufacturerError}</label>
                <br />
                <h5 class="thicker">Quantity</h5>
                <input

                    type="text"

                    name="quantity"

                    onChange={(e) => setQuantity(e.target.value)}

                    onBlur={(e) => ValidateField(e, "quantity")}
                    value={quantity}

                />
                <label style={{ color: 'red' }}>{quantityError}</label>
                <br />
                <h5 class="thicker">Price</h5>
                <input

                    type="text"

                    name="price"

                    onChange={(e) => setPrice(e.target.value)}

                    onBlur={(e) => ValidateField(e, "price")}
                    value={price}

                />
                <label style={{ color: 'red' }}>{priceError}</label>
                <button type="submit" className= "btn btn-primary" >


                    Submit

                </button>
                

            </form>

        </div>


    );



}


export default Addproducts;