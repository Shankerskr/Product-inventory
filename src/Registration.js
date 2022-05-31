import React,{useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import './Auth.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbars from "./Navbar";

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address format")
		.required("Email is required"),
	password: Yup.string()
		.min(3, "Password must be 3 characters at minimum")
		.required("Password is required"),
});

function Registration() {

		
	let navigate=useNavigate();

	useEffect(()=>{

		if(localStorage.getItem("userId"))
		{
			navigate("/home")
		}
	},[])
		return (
			<> <Navbars/>
			<div className="container centered">
				<div className="row">
					<div className="col-lg-12 ">
						<Formik
							initialValues={{ email: "", password: "",firstName:"",lastName:"",location:"",mobileNumber:0 }}
							validationSchema={LoginSchema}
							onSubmit={(values) => {
								
								let formData = {
									"email":values.email,
									"password":values.password,
									"firstName":values.firstName,
									"lastName":values.lastName,
									"location":values.location,
									"mobileNumber":values.mobileNumber
								};
								let options = {
									method: 'POST',
									headers: {
										'Content-Type':
											'application/json;charset=utf-8'
									},
									body: JSON.stringify(formData)
								};
								let fetchRes = fetch("http://localhost:3000/users", options);
						
								fetchRes.then(res =>
						
									res.json()).then(d => {
										console.log(d);

										navigate("/login")
									});

							}}
						>
							{({ touched, errors, isSubmitting, values }) =>
								!isSubmitting ? (
									<div>
										<div className="row mb-5">
											<div className="col-lg-12 text-center">
												<h1 className="mt-5">Register </h1>
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
											<div className="form-group">
												<label htmlFor="firstName">First Name</label>
												<Field
													type="text"
													name="firstName"
													placeholder="Enter First Name"
													autocomplete="off"
													className={`mt-2 form-control`}
												/>

												<ErrorMessage
													component="div"
													name="email"
													className="invalid-feedback"
												/>
											</div>
											<div className="form-group">
												<label htmlFor="lastName">Last Name</label>
												<Field
													type="text"
													name="lastName"
													placeholder="Enter Last Name"
													autocomplete="off"
													className={`mt-2 form-control`}
												/>

												<ErrorMessage
													component="div"
													name="email"
													className="invalid-feedback"
												/>
											</div>
											<div className="form-group">
												<label htmlFor="location">Location</label>
												<Field
													type="text"
													name="location"
													placeholder="Enter Location"
													autocomplete="off"
													className={`mt-2 form-control`}
												/>

												<ErrorMessage
													component="div"
													name="email"
													className="invalid-feedback"
												/>
											</div>
											<div className="form-group">
												<label htmlFor="mobileNumber">Mobile Number</label>
												<Field
													type="number"
													name="mobileNumber"
													placeholder="Enter Mobile Number"
													autocomplete="off"
													className={`mt-2 form-control`}
												/>

												<ErrorMessage
													component="div"
													name="email"
													className="invalid-feedback"
												/>
											</div>
											<div className="rowFlex">
												<button
													type="submit"
													className="btn btn-primary btn-block mt-4"
												>
													Register
												</button>

												<button type="button" class="btn btn-block mt-4">
													<Link to="/login" >Already have an account please Login</Link>
												</button>
											</div>


										</Form>
									</div>
								) : (
									<div>
										
										<div className="alert alert-success mt-3">
											Thank for your Registration, Redirecting to Login Page !
										</div>
										

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


export default Registration;
