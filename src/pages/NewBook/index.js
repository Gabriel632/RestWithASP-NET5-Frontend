import React from 'react';
import { useState, useEffect, } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function NewBook(){
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [lauchDate, setLauchDate] = useState('');
    const [price, setPrice] = useState('');

    const { bookId } = useParams();

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    useEffect(() => {
        if (bookId === '0') return;
        else loadBook();        
    }, [bookId]);

    async function loadBook() {
        try {
            const response = await api.get(`api/Book/v1/${bookId}`, authorization);
            
            let adjustedDate = response.data.lauchDate.split("T", 10)[0];

            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setLauchDate(adjustedDate);
            setPrice(response.data.price);
        } catch (error) {
            alert('Error recovering book! Try again!');
            navigate('/books');
        }
    }

    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
            title,
            author,
            lauchDate,
            price,
        };            

        try {            
            if (bookId === '0') {
                await api.post('api/Book/v1', data, authorization);
            } else {
                data.id = id;
                await api.put('api/Book/v1', data, authorization);
            }

            navigate('/books');
        } catch (error) {
            alert('Error while recordig book! Try again!');
        }
    }

    return (
        <div className='new-book-container'>
            <div className='content'>
                <section className='form'>
                    <img src={logoImage} alt='Erudio'/>
                    <h1>{bookId === '0' ? 'Add New' : 'Update'} Book</h1>
                    <p>Enter the book information and click on '{bookId === '0' ? 'Add' : 'Update'}'!</p>
                    <Link className='back-link' to='/books'>
                        <FiArrowLeft size={16} color='#251FC5'/>
                        Back to Books
                    </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input 
                        placeholder='Title' 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input 
                        placeholder='Author' 
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input 
                        type='date' 
                        value={lauchDate}
                        onChange={e => setLauchDate(e.target.value)}
                    />
                    <input 
                        placeholder='Price' 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <button type='submit' className='button'>{bookId === '0' ? 'Add' : 'Update'}</button>
                </form>
            </div>
        </div>
    );
}