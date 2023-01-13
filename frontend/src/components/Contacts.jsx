import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { getUserRoute } from '../utils/APIRoutes'

export default function Contacts({contacts, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)
  const [userMatches, setUserMatches] = useState([])

  useEffect(() => {
    const checkAuth = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    checkAuth()
  }, []);

  const changeCurrentChat = (username, contact) => {
    setCurrentSelected(username);
    changeChat(contact);
  }

  const handleChange = async event => {
    if(event.target.value) {
      const response = await axios.get(`${getUserRoute}/${event.target.value}`)
      setUserMatches(response.data)
    } else {
      setUserMatches([])
    }
  }

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <img src={logo} alt="logo" />
              <h3>PoopChat</h3>
            </div>
            <div className="findUser">
              <form>
                <input type="text" placeholder='Find user' onChange={e=>handleChange(e)}/>
              </form>
            </div>
            <div className="contacts">
              {
                userMatches.length ? 
                (
                  userMatches.map((contact) => {
                    return (
                      <div 
                        className={`contact ${contact.username === currentSelected ? "selected" : ""}`} 
                        key={contact.id}
                        onClick={() => changeCurrentChat(contact.username, contact)}
                      >
                        <div className="avatar">
                          <img
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                            alt="avatar" />
                        </div>
                        <div className="username">
                          <h3>{contact.username}</h3>
                        </div>
                      </div>
                    )
                  })
                ) : 
                (
                  contacts.map((contact) => {
                    return (
                      <div 
                        className={`contact ${contact.username === currentSelected ? "selected" : ""}`} 
                        key={contact.id}
                        onClick={() => changeCurrentChat(contact.username, contact)}
                      >
                        <div className="avatar">
                          <img
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                            alt="avatar" />
                        </div>
                        <div className="username">
                          <h3>{contact.username}</h3>
                        </div>
                      </div>
                    )
                  })
                )
              }
            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar" />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 65% 15%;
  overflow: hidden;
  background-color: #D89747;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .findUser {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    form {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      input {
        width: 90%;
        background-color: #C58940;
        border: none;
        padding: 0.5rem;
        border-radius: 0.4rem;
        color: white;
        &:focus {
          border: 0.1rem solid #ffe071;
          outline: none;
        }
        &::placeholder {
          color: white;
          opacity: 0.5;
        }
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #FEB862;
    }
  }
  .current-user {
    background-color: #edac5d;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }

    /* @media only screen and (max-width: 480px) and (min-width: 320px){
      form {
        transform: scale(0.65);
      }
    } */
  }
`;