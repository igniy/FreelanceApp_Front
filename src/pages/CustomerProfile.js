import React, { useState, useEffect } from 'react';
import { getUserProfile, getProjectsByClient } from '../api';

const CustomerProfile = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                //alert(response.data.user._id);
                if (response.data.user) {
                    setFormData({
                        username: response.data.user.username || '',
                        email: response.data.user.email || ''
                    });

                    const projectsResponse = await getProjectsByClient(response.data.user._id);
                    //alert(projectsResponse.data);
                    setProjects(projectsResponse.data);
                } else {
                    console.error("No user data found in profile response");
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                alert('Failed to fetch profile. Please check your authentication.');
            }
        };

        fetchProfile();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Customer Profile</h2>
            <div>
                <strong>Name:</strong> {formData.username}
            </div>
            <div>
                <strong>Email:</strong> {formData.email}
            </div>
            <h3>Your Projects</h3>
            <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        <div>
                            <strong>Title:</strong> {project.title}
                        </div>
                        <div>
                            <strong>Description:</strong> {project.description}
                        </div>
                        <div>
                            <strong>Status:</strong> {project.status}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerProfile;
