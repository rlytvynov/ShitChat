import React, {useState} from 'react'
import styled from 'styled-components'
import EmojiPicker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from 'react-icons/bs'
export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmogiClick = (emojiData, event) => {
        let message = msg
        console.log(emojiData.emoji)
        message+=emojiData.emoji
        setMsg(message)
    }
    const sendChat = (event) => {
        event.preventDefault()
        if(msg.length > 0) {
            handleSendMsg(msg)
            setMsg('')
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <EmojiPicker height={450} width={350} onEmojiClick={handleEmogiClick}/>
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => {sendChat(e)}}>
                <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
                <button className='submit'>
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: none;
    padding: 0 2rem;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 2rem;
        gap: 1rem;
    }
    @media screen and (min-width: 320px) and (max-width: 720px) {
        padding: 0 1rem;
        gap:0.8rem;
    }

    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;

        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                top: -480px;
                background-color: #C58940;
                border-color: #FEB862;
                box-shadow: 0px 5px 10px #FEB862;
                .epr-category-nav {
                    button {
                        filter: contrast(5);
                    }
                }

                .epr-search {
                    background-color: transparent;
                    border-color: #FEB862;
                    color: #FEB862;
                    &::placeholder {
                        color: #FEB862;
                    }
                    .epr-icn-search {
                        color: #FEB862;
                    }
                }

                .epr-emoji-category-label {
                    background-color: #C58940;
                    color: white;
                }

                .epr-preview {
                    display: none;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;

        input {
            width: 90%;
            /* height: 60%; */
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #FEB862;
            }
            &:focus {
                outline: none;
            }
            &::placeholder {
                color: white;
                opacity: 0.5;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #FEB862;
            border: none;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                    color: white;
                }
            }
            @media screen and (min-width: 320px) and (max-width: 720px) {
                padding: 0.3rem 0.5rem;
                svg {
                    font-size: 0.5rem;
                    color: white;
                }
            }
            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
`