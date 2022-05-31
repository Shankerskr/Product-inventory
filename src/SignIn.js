import React,{useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import './Auth.css'
// import Registration from "./Registration";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Navbars  from "./Navbar";

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address format")
		.required("Email is required"),
	password: Yup.string()
		.min(3, "Password must be 3 characters at minimum")
		.required("Password is required"),
});

function SignIn (props){



	const navigate = useNavigate();

	useEffect(() => {
		
		if(localStorage.getItem("userId"))
		{
			navigate("/home");
		}
	}, [])
	


		return (
			<> <Navbars/>
			<div className="container centered">
				<div className="row">
					<div className="col-lg-12 ">
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={LoginSchema}
							onSubmit={(values) => {
								console.log(values);
								
								
								let options = {
									method: 'GET',
									headers: {
										'Content-Type':
											'application/json;charset=utf-8'
									}
								};
								let fetchRes = fetch("http://localhost:3000/users", options);
						
								fetchRes.then(res =>
						
									res.json()).then(d => {
										let allusers=d;
										console.log(allusers)
										let result=allusers.filter(e=>{
											
											if(e.email==values.email && e.password==values.password)
											{
												return true;
											}
											return false;
										});
									
										if(result.length>0)
										{
											const now = new Date();
											let user={
												user:result[0],
												expiry: now.getTime() + 86400000
											}
											let userId={
												id:result[0].id,
												expiry: now.getTime() + 86400000

											}
											
											localStorage.setItem("userId",JSON.stringify(userId));
											localStorage.setItem(""+result[0].id,JSON.stringify(user));
											
											navigate("/home");
										}
										
										
									});
							}}
						>
							{({ touched, errors, isSubmitting, values }) =>
								!isSubmitting ? (
									<div>
										<div className="row mb-5">
											<div className="col-lg-12 text-center">
												<h1 className="mt-5">Login </h1>
											</div>
										</div>
										<Form >
											<div className="form-group">
												<label htmlFor="email">Email</label>
												<Field
													type="email"
													name="email"
													placeholder="Enter email"
													autocomplete="off"
													className={`mt-2 form-control
						${touched.email && errors.email ? "is-invalid" : ""}`}
												/>

												<ErrorMessage
													component="div"
													name="email"
													className="invalid-feedback"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="password" className="mt-3">
													Password
												</label>
												<Field
													type="password"
													name="password"
													placeholder="Enter password"
													className={`mt-2 form-control
						${touched.password && errors.password
															? "is-invalid"
															: ""
														}`}
												/>
												<ErrorMessage
													component="div"
													name="password"
													className="invalid-feedback"
												/>
											</div>
											<div className="rowFlex">
												<button
													type="submit"
													className="btn btn-primary btn-block mt-4"
												>
													Login
												</button>

												<button type="button" class="btn btn-block mt-4">
													<Link to="/register" >visiting first time please Signup</Link>
												</button>
											</div>


										</Form>
									</div>
								) : (
									<div>
										

									</div>
								)
							}

						</Formik>
					</div>

				</div>


			</div>
			</>
		);
	}


export default SignIn;
