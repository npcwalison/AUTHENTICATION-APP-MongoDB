import React from "react";
import { Card, Flex, Form, Input, Button, Alert, Spin, Typography } from "antd";
import "./styles.css";
import { Link } from "react-router-dom";

import registerImage from "../assets/register.png";
import useLogin from "../hooks/useLogin";


const Login = () => {
    const {error, loading, loginUser } = useLogin();

    const handleLogin = async (values) => {
        await loginUser(values)
    };

    return (
        <Card className="form-container">
            <Flex gap="large" align="center">
                {/* Image */}
                <Flex flex={1}>
                    <img src={registerImage} className="auth-image" />
                </Flex>
                {/* form */}
                <Flex vertical flex={1}>
                    <Typography.Title level={2} strong className="title">
                        Sign In
                    </Typography.Title>
                    <Typography.Title
                        type="secondary"
                        strong
                        className="slogan"
                        level={4}
                    >
                        Unlock you world!
                    </Typography.Title>
                    <Form
                        layout="vertical"
                        onFinish={handleLogin}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "please input your email!",
                                },
                                {
                                    type: "email",
                                    message: "The input is not valid email!",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Enter your full email"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "please input your passoword!",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Enter your full password"
                            />
                        </Form.Item>

                        {error && (
                            <Alert
                                description={error}
                                type="error"
                                showIcon
                                closable
                                className="alert"
                            />
                        )}

                        <Form.Item>
                            <Button
                                type={`${loading ? '' : 'primary'}`}
                                htmlType="submit"
                                size="large"
                                className="btn"
                            >
                                {loading ? <Spin /> : 'Sign In'}
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Link to={"/"}>
                                <Button size="large" className="btn">
                                    Create an account
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Flex>

            </Flex>
        </Card>
    );
};

export default Login;