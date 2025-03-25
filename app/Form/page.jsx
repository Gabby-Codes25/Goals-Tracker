'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../Firebase/firebaseAuth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function GoalForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [goalAdded, setGoalAdded] = useState(false);
    const router = useRouter();


    const onSubmit = async (e) => {
        e.preventDefault();
        const goal = { title, body, createdAt: serverTimestamp() };

        console.log("Submitting Goal:", goal); // Debugging step

        try {
            const docRef = await addDoc(collection(db, "goals"), goal);
            console.log("Goal added with ID:", docRef.id); // Log success
            setTitle("");
            setBody("");
            setGoalAdded(true); // Update state instead of directly navigating
        } catch (error) {
            console.error("Error adding goal:", error);
        }
    };

    // Use useEffect to navigate after hydration
    useEffect(() => {
        if (goalAdded) {
            router.push("/Goal");
        }
    }, [goalAdded, router]);

    

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add New Goal</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                    <input
                        type="text"
                        id="title"
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
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                {typeof window !== "undefined" ? "Add Goal" : "Loading..."}
                </button>
            </form>
        </div>
    );
}

export default GoalForm;