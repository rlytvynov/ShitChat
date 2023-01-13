import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.png'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

function Login() {
  const navigate = useNavigate()
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(handleValidation()) {
      const { data } = await axios.post(loginRoute, {
        username: values.username,
        password: values.password
      })
      if(data.status === false) {
        toast.error(data.msg, toastOptions)
      } else {
        toast.success(data.msg, toastOptions)
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user))
        navigate("/")
      }
    }
  }
  const handleChange = event => {
    setValues({...values, [event.target.name]:event.target.value})
  }

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  }

  return (
    <>
      <FormContainer>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img src={logo} alt="logo" />
              <h1>PoopChat</h1>
            </div>
            <input type="text" placeholder='Username' name='username' onChange={e=>handleChange(e)}/>
            <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)}/>

            <button type="submit">Login</button>
            <span>Don't have an account yet ? <Link to = '/register'>Register</Link></span>
          </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #E5BA73;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #C58940;
    border-radius: 2rem;
    padding: 3rem 5rem;

      .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
          height: 5rem;
        }
        h1 {
          color: white;
          text-transform: uppercase;
        }
      }

      input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #FAEAB1;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #FAF8F1;
        outline: none;
      }
      &::placeholder {
        color: white;
        opacity: 0.5;
      }
    }
    button {
      background-color: #ffe071;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #9c703a;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #FAEAB1;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }

  @media only screen and (max-width: 480px) and (min-width: 320px){
    form {
      transform: scale(0.65);
    }
  }
`;

export default Login
