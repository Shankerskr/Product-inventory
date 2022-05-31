import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import SignIn from './SignIn';
import Registration from './Registration'
import Navbars from './Navbar';
import Addproducts from './Addproduct';
import Home from './Home';
import UpdateProduct from './Updateproduct';
import About from './About';
import TopProductList from './TopProductList';
import React from 'react';

function Routing() {

  
  return (

    <div>
      <Router >
     
        <Routes>
        <Route exact  path="/"
          element={ <Navigate to="/home" replace/> }/>
       
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<SignIn />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/Addproduct" element={<Addproducts />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />} /> 
          <Route path="/topproducts" element={<TopProductList />} /> 
          
        
        </Routes>

      </Router>
    </div>
  );
}

export default Routing;