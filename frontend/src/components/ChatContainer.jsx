import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({currentChat, currentUser, socket}) {

    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()
    useEffect(() => {
        const getMessages = async () => {
            if(currentChat) {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser.id,
                    to: currentChat.id,
                })
                // console.log(currentChat.id)
                setMessages(response.data.data)
            }
        }
        getMessages()

    }, [currentChat, currentUser])

    const handleSendMsg = async (msg) => {
        const data = await axios.post(sendMessageRoute, {
            from: currentUser.id,
            to: currentChat.id,
            message: msg
        })
        console.log(data)
        socket.current.emit("send-msg", {
            from: currentUser.id,
            to: currentChat.id,
            message: msg
        })
        const msgs = [...messages]
        msgs.push({senderID: currentUser.id, accceptorID: currentChat.id, text: msg})
        setMessages(msgs)
    }

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({senderID: msg.from, acceptorID: msg.to, text: msg.message})
            })
        }
    }, [socket, currentChat, currentUser])

    useEffect(() => {
        arrivalMessage && 
        arrivalMessage.senderID === currentChat.id && 
        arrivalMessage.acceptorID === currentUser.id && 
        setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat, currentUser])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [messages])

    return (
        <>
        {
            currentChat && 
            (
                <Container>
                <div className="chat-header">
                    <div className="user-details">
                        <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt=""
                        />
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout />
                </div>
                <div className="chat-messages">
                    {
                        messages.map((message) => (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.senderID === currentUser.id? "sended" : "recieved"}`}>
                                    <div className="content">
                                        <p>
                                            {message.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <ChatInput handleSendMsg={handleSendMsg} />
            </Container>
            )
        }
        </>
    );
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 75% 15%;
    gap: 0.1rem;
    overflow: hidden;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{img{
                height: 3rem;
            }}
            .username {
                h3 {
                    color: white
                }
            }
        }
    }
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: white;
            }
            &.sended {
                justify-content: flex-end;
                .content {
                    background-color: #edac5d;
                }
            }
            &.recieved {
                justify-content: flex-start;
                .content {
                    background-color: #9d6929;
                }
            }
        }
    }
`;