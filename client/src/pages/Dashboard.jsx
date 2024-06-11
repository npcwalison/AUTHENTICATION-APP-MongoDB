import { Avatar, Button, Card, Flex, Typography } from "antd";
import React from "react";
import { useAuth } from "../context/authContext";
import { UserOutlined } from '@ant-design/icons';
import './styles.css';


const Dashboard = () => {
    const { userData, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Card className="profile-card">
            <Flex vertical gap='small' align="center">
                <Avatar size={150} icon={<UserOutlined />} className="avatar" />
                <Typography.Title level={2} strong className="username">
                    Name: {userData.name}
                </Typography.Title>
                <Typography.Title strong level={5} className="secondary">
                    Email: {userData.email}
                </Typography.Title>
                <Typography.Title level={5} className="secondary">
                    Role: {userData.role}
                </Typography.Title>
                <div>Dashboard</div>
                <Button size="large" type="primary" className="profile-btn" onClick={handleLogout}>
                    Logout
                </Button>
            </Flex>
        </Card>
    );
};

export default Dashboard;
