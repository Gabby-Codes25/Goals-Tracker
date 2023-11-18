'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Form() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const goal = { title, body };
        console.log('Submitting goal:', goal);
    
        try {
            const response = await axios.post('http://localhost:5000/api/goals', goal);
            console.log('Server response:', response);
    
            if (response.status === 200) {
                setTitle('');
                setBody('');
                router.push("/")
            }
        } catch (error) {
            console.error('Error submitting goal:', error);
        }
    };
    

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add New Goal</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-600">Body</label>
                    <textarea
                        id="body"
                        name="body"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button
                    type='submit'
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Add Goal
                </button>
            </form>
        </div>
    );
}

export default Form;
