import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import useUserContext from '../UserContext';

const  loginSchema = Yup.object().shape({
  
  email: Yup.string().email('Invalid email').required('Required'),
});

const Login = () => {

  const {setloggedIn} = useUserContext();

  // initializing formik
  const loginForm = useFormik({
    initialValues: {
      email :'',
      password :''
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch('http://localhost:5000/user/authenticate',{
        method: 'POST',
        body: JSON.stringify(values),
        headers:{
          'Content-Type' : 'application/json'
        }
      });
      console.log(res.status);
      if(res.status === 200){
        Swal.fire({
          icon : 'success',
          title : 'Login Success!!'
        });

        const data = await res.json();
        sessionStorage.setItem('user', JSON.stringify(data));

        setloggedIn(true)
        
      }else if(res.status === 401){
          Swal.fire({
            icon : 'warning',
            title : 'Login Failed',
            text : 'Invalid email or password'
          })
      } else{
        Swal.fire({
          icon : 'error',
          title : 'Oops!!',
          text: 'Some Error Occured'
       });
      }
    },

    validationSchema: loginSchema
  });
  

  return (
    
    <div className="container py-4 vh-100">
      <div className=" d-flex align-item-center justify-content-center  ">
       
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt=""
        className='h-50 w-50 py-4' />
       
       <div className='mx-5 card w-75'>
       <div className=" card-body">
          <h2 className="text-center fw-bold my-3">Login Form</h2>
          <form onSubmit={loginForm.handleSubmit}>
            <div className="form-outline ">
            <label htmlFor="">Email</label>
            <p>{loginForm.errors.email}</p>
            <input className="form-control mb-4" type="email" name="email" onChange={loginForm.handleChange} value={loginForm.values.email} />
            </div>
            <div>  
              <label htmlFor="">Password</label>
              <input className="form-control mb-4" type="password" name="password" onChange={loginForm.handleChange} value={loginForm.values.password}/>
            </div>
            <div className="d-flex justify-content-around align-item-center mb-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="">Remember me</label>
              </div>
              <a href="">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary  w-100 rounded-3">SIGN IN</button>
             <div className='divider align-item-center my-4'>
            <p className='text-center fw-bold mx-3 mb=0 text-muted'>OR</p>
            </div>

            <div class="d-flex  align-items-center justify-content-center ">
            <p class="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" class="btn btn-primary btn-floating mx-1">
              <i class="fab fa-facebook-f"></i>
            </button>

            <button type="button" class="btn btn-primary btn-floating mx-1">
              <i class="fab fa-twitter"></i>
            </button>

            <button type="button" class="btn btn-primary btn-floating mx-1">
              <i class="fab fa-linkedin-in"></i>
            </button>
          </div>

          </form>
       </div>
       </div>
       </div>
    </div>
   
  )
}

export default Login