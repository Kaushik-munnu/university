import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/students', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Profile</h1>
            <p>Username: {profile.username}</p>
            <p>Name: {profile.name}</p>
            <p>Enrollment Year: {profile.enrollmentYear}</p>
            <p>Field: {profile.fieldId.name}</p>
        </div>
    );
};

export default MyProfile;
