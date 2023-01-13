import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import { Buffer } from "buffer";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/45678945`
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
        }
    }, [navigate]);

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined) {
            toast.error('Please, select an avatar', toastOptions)
        } else {
            const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
            const {data} = await axios.patch(`${setAvatarRoute}/${user.id}`, {
                image: avatars[selectedAvatar]
            })
            if(data.isSet) {
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user))
                navigate('/')
            } else {
                toast.error('Some error occured', toastOptions)
            }
        }
    }

    useEffect(() => {
        const getImageArray = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
              const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}?apikey=bidH0S5ejvEMFC`
              );
              const buffer = new Buffer(image.data);
              data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        getImageArray()
    }, [api])

  return (
    <>
        {
            isLoading ? (
            <Container>
                <img src={loader} alt="loader" className="loader" />
            </Container> 
            ) : (
            <Container>
                <div className="title-container">
                    <h1>
                        Pick na avatar as your profile picture
                    </h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div
                                key={index}
                                className={`avatar ${
                                    selectedAvatar === index ? "selected" : ""
                                }`}
                                >
                                  <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    key={avatar}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)}
                                  />
                                </div>
                            );
                        })
                    }
                </div>
                <button onClick={setProfilePicture} className="submit-btn">
                    Set as Profile Picture
                </button>
                <ToastContainer />
            </Container> ) 
        }
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #E5BA73;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #C58940;
    }
  }
  .submit-btn {
    background-color: #C58940;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #C58940;
    }
  }
`;