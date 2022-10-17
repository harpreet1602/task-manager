import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { CredentialsContext } from '../App';
import Swal from 'sweetalert2';

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    // const [,setCredentials] = useContext(CredentialsContext);

    // const url="http://localhost:5500";
    const navigate = useNavigate();
    const url="https://to-do-list-op.herokuapp.com";
    const register = async(e)=>{
        e.preventDefault();
        await fetch(`${url}/register`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            // console.log(res);
            // if(res.token){
            
            // localStorage.setItem('user',JSON.stringify({token:res.token}));
            // navigate('/');
            // }
            if(res?.message){
            setError(res.message);
            }
            else{
              navigate('/checkemail');
            }
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
    <section
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 p-5">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-3">
                      Create an account
                    </h2>
                    {error!==""?
                    // <div className="popMes">{error}</div>
                    showAlert(error)
                    :""}
                    <form onSubmit={(e)=>{register(e);}}>
                      <div className="form-outline mb-1">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={(e)=>{
                            setName(e.currentTarget.value);
                          }}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          Your Name
                        </label>
                      </div>

                      <div className="form-outline mb-1">
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

                      <div className="form-outline mb-1">
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
{/* 
                      <div className="form-outline mb-1">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cdg">
                          Repeat your password
                        </label>
                      </div> */}

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-3 mb-1">
                        Have already an account?{" "}
                        <Link to="/login"className="fw-bold text-body">
                            Login here
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
  )
}

export default Register