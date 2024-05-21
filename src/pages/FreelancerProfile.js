import React, { useState, useEffect, useContext } from 'react';
import { getUserProfile, getProjectsByFreelancer, updateProfile, deleteProject } from '../api';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';

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
                if (response.data.user) {
                    setFormData({
                        username: response.data.user.username || '',
                        email: response.data.user.email || '',
                        skills: response.data.user.skills ? response.data.user.skills.join(', ') : ''
                    });

                    const projectsResponse = await getProjectsByFreelancer(response.data.user._id);
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
        <Container className="profile-container" style={{ padding: '2rem' }}>
            <Row className="mb-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Freelancer Profile</Card.Title>
                            <Form onSubmit={onSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={onChange}
                                        placeholder="Name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSkills" className="mt-3">
                                    <Form.Label>Skills (comma separated)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={onChange}
                                        placeholder="Skills"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">Update Profile</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <h3>Assigned Projects</h3>
                    <ListGroup>
                        {projects.map(project => (
                            <ListGroup.Item key={project._id} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{project.title}</Card.Title>
                                        <Card.Text>{project.description}</Card.Text>
                                        <Button variant="danger" onClick={() => handleDeleteProject(project._id)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default FreelancerProfile;
