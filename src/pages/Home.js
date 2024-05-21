import React, { useState, useEffect, useContext } from 'react';
import { addProjectToFreelancer, getOrders } from '../api';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button } from 'react-bootstrap';
import '../styles/Home.css';

const Home = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleAddProject = async (projectId) => {
        try {
            await addProjectToFreelancer(projectId);
        } catch (error) {
            console.error('Error applying to project:', error);
            alert('Failed to apply to project.');
        }
    };

    return (

        <Container className="home-container">
            <div className="page-title">Available Projects: </div>
            <div className="project-list">
                {orders.map(order => (
                    <Card className="project-card" key={order._id}>
                        <Card.Body>
                            <Card.Title>{order.title}</Card.Title>
                            <Card.Text>{order.description}</Card.Text>
                            {user && user.role === 'freelancer' && (
                                <Button variant="primary" onClick={() => handleAddProject(order._id)}>
                                    Add to My Projects
                                </Button>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Status: {order.status}</small>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default Home;
