import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';
import padlock from '../../assets/padlock.png';

export default function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        const data = {
            userName,
            password,
        };

        try {
            const response = await api.post('api/Auth/v1/signin', data);

            localStorage.setItem('userName', userName);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            navigate('/books');
        } catch (error) {
            alert('Login failed! Try again!');
        }
    }

    return (
        <div className='login-container'>
            <section className='form'>
                <img src={logoImage} alt="Erudio logo" />
                <form onSubmit={login}>
                    <h1>Access your Account</h1>

                    <input 
                        placeholder='UserName' 
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    
                    <input 
                        placeholder='Password' 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type='submit' className='button'>Login</button>
                </form>
            </section>

            <img src={padlock} alt="Login" />
        </div>
    );
}