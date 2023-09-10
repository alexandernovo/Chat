import React, { useState, useEffect } from 'react';
import Placeholder from '../assets/profile/placeholder.jpg';
import axios from 'axios';

const Messages = ({ onClick }) => {
    const token = sessionStorage.getItem('authToken');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    console.log(token);
    const fetchData = () => {
        if (token) {
            axios.get('/api/chat/getMessages', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.data.status === 'success') {
                    setMessages(response.data.data.messages);
                    setUser(response.data.data.token);
                }
            }).catch((error) => {
                console.log('error :', error);
            });
        } else {
            console.log('Error: Token not Provided');
        };
    };

    useEffect(() => {
        // Function to fetch data initially
        const fetchInitialData = () => {
            fetchData();
        };

        // Function to fetch data when searchInput changes
        const fetchUpdatedData = () => {
            fetchData();
        };

        // Fetch data initially
        fetchInitialData();

        // Fetch data immediately when component is re-mounted
        fetchData();

        // Set interval to fetch data every 5 seconds
        const interval = setInterval(fetchUpdatedData, 5000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className=''>
            <p className='text-gray-500 text-[13px] mb-2 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 me-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                Messages
            </p>
            {messages && messages.length !== 0 ? (
                messages
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((message, index) => (
                        <div key={index} className='mb-3 text-white'>
                            <div className='flex items-center py-1'>
                                <img
                                    src={user === message.sender._id ? (message.receiver.image || Placeholder) : (message.sender.image || Placeholder)}
                                    className='h-11 w-11 rounded-full'
                                />

                                <div className='ms-2'>
                                    {user === message.sender._id ? (
                                        <div className='cursor-pointer' onClick={() => onClick(message.receiver._id)}>
                                            <h6 className='text-[14px]'>{`${message.receiver.firstname} ${message.receiver.lastname}`}</h6>
                                            <p className='text-[11px] text-gray-400 truncate'>{`You: ${message.message}`}</p>
                                        </div>
                                    ) : (
                                        <div className='cursor-pointer' onClick={() => onClick(message.sender._id)}>
                                            <h6 className='text-[14px]'>{`${message.sender.firstname} ${message.sender.lastname}`}</h6>
                                            <p className='text-[11px] text-gray-400 truncate'>{message.message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
            ) : (
                <p className='text-gray-300 text-center text-[13px]'>No Messages.</p>
            )}
        </div>
    );
};

export default Messages;
