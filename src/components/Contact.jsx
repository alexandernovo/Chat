import React from 'react';
import Avatar1 from '../assets/profile/avatar1.jpg';

const Contact = ({ contact, onClick }) => {
    return (
        <>
            {contact && contact.length !== 0 ? (contact.map(result => (
                <div key={result._id} className='mb-3 text-white cursor-pointer' onClick={() => onClick(result._id)}>
                    <div className='flex items-center py-1'>
                        <img src={Avatar1} className='h-11 w-11 rounded-full' />
                        <div className='ms-2'>
                            <h6 className='text-[14px]'>{contact ? (`${result.firstname} ${result.lastname}`) : ''}</h6>
                        </div>
                    </div>
                </div>
            ))

            )
                : (
                    <p className='text-gray-300 text-center text-[13px]'>No results found.</p>
                )
            }
        </>
    );
};

export default Contact;