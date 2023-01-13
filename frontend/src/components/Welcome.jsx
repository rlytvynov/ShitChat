import React, { useState, useEffect } from "react";
import styled from "styled-components";
import poop from "../assets/poop.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const setUser = async () => {
        setUserName(
            await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            ).username
        );
    }
    setUser()
  }, []);
  return (
    <Container>
      <img src={poop} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 15rem;
  }
  span {
    color: #FEB862;
  }
`;