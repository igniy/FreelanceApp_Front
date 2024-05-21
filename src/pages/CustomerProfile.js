import React, { useState, useEffect } from 'react';
import { getUserProfile, getProjectsByClient } from '../api';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

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
                if (response.data.user) {
                    setFormData({
                        username: response.data.user.username || '',
                        email: response.data.user.email || ''
                    });

                    const projectsResponse = await getProjectsByClient(response.data.user._id);
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
        <Container style={{ padding: '2rem' }}>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Customer Profile</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {formData.username}
                            </Card.Text>
                            <Card.Text>
                                <strong>Email:</strong> {formData.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Your Projects</h3>
                    <ListGroup>
                        {projects.map(project => (
                            <ListGroup.Item key={project._id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{project.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Description:</strong> {project.description}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Status:</strong> {project.status}
                                        </Card.Text>
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

export default CustomerProfile;
