import React, {useState, useEffect, useContext} from 'react';
import {addProjectToFreelancer, getOrders} from '../api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
    //const [projects, setProjects] = useState([]);
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
            alert('Applied to project successfully!');
        } catch (error) {
            console.error('Error applying to project:', error);
            alert('Failed to apply to project.');
        }
    };

    return (
        <div className="home-container">
            <h2>Available Projects</h2>
            <ul className="project-list">
                {orders.map(order => (
                    <li key={order._id} className="project-card">
                        <div>
                            <h3>Title:</h3> {order.title}
                        </div>
                        <div>
                            <p>Description:</p> {order.description}
                        </div>
                        <div>
                            <p className="project-status">Status:</p> {order.status}
                        </div>
                        {user && user.role === 'freelancer' && (
                            <button onClick={() => handleAddProject(order._id)}>Add to My Projects</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
