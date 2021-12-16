import React, { useEffect, useState } from "react";
// import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
// import Sitefooter from "../Footers/Sitefooter";
import "./newStyle2.css";
// import "../bootstrap/dist/css/bootstrap.min.css";

// import "bootstrap/dist/css/bootstrap/min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import {Link,useHistory} from 'react-router-dom';


export default function AdminRegister() {
  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('role') === 'admin'){
      history.push('/admindashboard')
    }

    if(localStorage.getItem('token') && localStorage.getItem('role') === 'user'){
      history.push('/dashboard')
    }
    
  })

  const authAxios = axios.create({
    baseURL: "http://localhost:5003",
    
  });

  let form_data = {};
  const [authkey, setAuthkey] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory()


  const [password, setPassword] = useState("");

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    let form_data = {
      email: email,
      password: password,
      authkey: authkey
   
    };

    console.log(form_data)
    authAxios
      .post("http://localhost:5003/aptadmins/add", form_data)
      .then((res) => {
        if (res.data) {

            if(password.length < 6) {
                alert('Password should be atleast 6 characters long')
            } else{
                alert('Registered successfully')
                window.location = "/adminregister";
            }
        } else {

         
        alert('Not able to register')
        }
      });
  };

   return (
    <div>
     <img class="fillpic" src="/lol.jpeg" style={{ width: "100%", height: "auto" }}/>
    <div className="register " class="registerback">
      <div className="register_container shadow" class="colorbox" style={{display:'flex',justifyContent:'center'}}>
        <form onSubmit={handleSubmit(onSubmit)} class=" newrow">
          <h3 class="section-header">Admin Signup</h3>
            <br/>
          <div class=" indv">
          <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
          
          <input
            placeholder="Enter Email"
            name="firstname"
            class="form-control"
            value={email}
            type="email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}       
          />
          </div>
          </div>
                   
          <div class="indv">
          <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-lock fa"  aria-hidden="true"></i></span>
          <input
            placeholder="Password"
            name="password"
            class="form-control"
            defaultValue={password}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
          ></input>
          {errors.password && errors.password.message}
          </div>
          </div>
          <div class=" indv">
          <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
          
          <input
            placeholder="Enter Auth Key"
            name="authkey"
            class="form-control"
            value={authkey}
            type="text"
            required
            onChange={(event) => {
              setAuthkey(event.target.value);
            }}       
          />
          </div>
          </div>
          <br></br>
          <div class="col-12">
          <div class="custom-control custom-control-alternative custom-checkbox">
            <input class="custom-control-input" id="customCheckRegister" type="checkbox" required></input>
              <label class="custom-control-label" for="customCheckRegister">
                <span>I agree with the <a href="#pablo">Privacy Policy</a>
                </span>
              </label>
          </div>
          </div>
          <br></br>

          <div class="coolone">
          <button  class="col-md-10 indv" style={{backgroundColor:'#3f51b5', color:'white'}}className="shadow btn my-2 mx-5" type="submit">
            Submit
          </button>
          </div>  
          <span>Have a admin account? <Link to="/AdminLogin">Sign In</Link></span><br/>
          <span>Go to <Link to="/">Human Resource Sign Up</Link></span><br/>
        </form>
      </div>
      </div>
    </div>
  );
}