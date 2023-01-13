import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host} from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from "../components/Welcome";
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'

export default function Chat() {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  // eslint-disable-next-line
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    const getCurrentUser = async() => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
        setIsLoaded(true)
      }
    }
    getCurrentUser()
  }, [navigate]);

  useEffect(()=>{
    if(currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user", currentUser.id)
    }
  }, [currentUser])

  useEffect(() => {
    const getAllUsers = async () => {
      if(currentUser) {
        if(currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser.id}`)
          setContacts(data.data)
          console.log(data.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    getAllUsers()
  }, [currentUser, navigate])
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {isLoaded && currentChat === undefined ? (
            <Welcome />
          ) : (
            isLoaded ? <ChatContainer 
              currentChat={currentChat} 
              currentUser = {currentUser} 
              socket = {socket}
              /> : <></>
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #E5BA73;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #C58940;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 1rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 320px) and (max-width: 720px) {
      grid-template-columns: 45% 55%;
    }
  }
`;