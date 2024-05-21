import React, { useState, useEffect } from 'react';
import { createProject, getUserProfile } from '../api';

const CreateProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'open'
    });

    const { title, description, status } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await createProject(formData);
            //alert('Project created successfully!');
        } catch (error) {
            console.error('Project creation failed:', error);
            alert('Project creation failed.');
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                if (response.data.user) {
                    console.log("User profile:", response.data.user);
                } else {
                    console.error("No user data found in profile response");
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Create Project</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                        placeholder="Description"
                        required
                    ></textarea>
                </div>
                <div>
                    <select name="status" value={status} onChange={onChange}>
                        <option value="open">Open</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default CreateProject;
