import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi'


export default function Logout() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <Button onClick={handleLogout}>
            <BiPowerOff/>
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #FA5757;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #EBE7FF
    }
`
