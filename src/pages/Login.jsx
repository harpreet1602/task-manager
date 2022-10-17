import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { CredentialsContext } from '../App';
import Swal from 'sweetalert2';
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [,setCredentials] = useContext(CredentialsContext);

    // const url="http://localhost:5500";
    const navigate = useNavigate();
    const url="https://to-do-list-op.herokuapp.com";

    const login = async(e)=>{
        e.preventDefault();
        await fetch(`${url}/login`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{

            if(res.token){
            const userId = res._id;
            const name = res.name;
            const token = res.token;
            setCredentials({
                name,
                email,
                password,
                userId,
                token
            });
            localStorage.setItem('user',JSON.stringify({token:res.token}));
            navigate('/');
            return;
            }
            setError(res.message);
        })
        .catch((err)=>{
            setError(err.message);
        });
    }
    const showAlert = (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      })
      setError("");
    }
    return (
    <div>
      <section>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 p-5">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-3">Sign In</h2>
                    {error!==""?
                    // <div className="popMes">{error}</div>
                    showAlert(error)
                    :""}
                    <form onSubmit={(e)=>{login(e);}}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={(e)=>{
                            setEmail(e.currentTarget.value);
                          }}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={(e)=>{
                            setPassword(e.currentTarget.value);
                          }}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Sign In
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?{" "}
                        <Link to="/register" className="fw-bold text-body">
                          <u>Register here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
