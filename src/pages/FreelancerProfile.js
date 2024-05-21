import React, {useState, useEffect, useContext} from 'react';
import { getUserProfile, getProjectsByFreelancer, updateProfile, deleteProject } from '../api';
import {AuthContext} from "../context/AuthContext";
import '../styles/FreelancerProfile.css';
const FreelancerProfile = () => {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        skills: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                //alert(response.data.user);
                if (response.data.user) {
                    setFormData({
                        username: response.data.user.username || '',
                        email: response.data.user.email || '',
                        skills: response.data.user.skills ? response.data.user.skills.join(', ') : ''
                    });

                    const projectsResponse = await getProjectsByFreelancer(response.data.user._id);
                    // alert(projectsResponse.data.projects)

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

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Profile update failed:', error);
            alert('Profile update failed.');
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter(project => project._id !== projectId));
            alert('Project deleted successfully!');
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project.');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Freelancer Profile</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={onChange}
                            placeholder="Skills (comma separated)"
                            required
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
            <h3>Assigned Projects</h3>
            <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        {project.title} - {project.description}
                        <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default FreelancerProfile;
