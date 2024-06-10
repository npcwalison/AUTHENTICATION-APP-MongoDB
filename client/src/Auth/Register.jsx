import React from "react";
import { Card, Flex, Form, Input, Button, Alert, Spin, Typography } from "antd";
import "./styles.css";
import { Link } from "react-router-dom";

import registerImage from "../assets/register.png";
import useSignUp from "../hooks/useSignUp";


const Register = () => {
    const { loading, error, registerUser } = useSignUp();

    const handleRegister = (values) => {
        registerUser(values)
    };

    return (
        <Card className="form-container">
            <Flex gap="large" align="center">
                {/* form */}
                <Flex vertical flex={1}>
                    <Typography.Title level={2} strong className="title">
                        Create an account
                    </Typography.Title>
                    <Typography.Title
                        type="secondary"
                        strong
                        className="slogan"
                        level={4}
                    >
                        Join for exclusive acess!
                    </Typography.Title>
                    <Form
                        layout="vertical"
                        onFinish={handleRegister}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "please input your name!",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Enter your full name"
                            />
                        </Form.Item>

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

                        <Form.Item
                            label="Password"
                            name="passwordComfirm"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "please input your confirm password!",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Confirm your password"
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
                                {loading ? <Spin /> : 'Create Account'}
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Link to={"/login"}>
                                <Button size="large" className="btn">
                                    Sign In
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Flex>

                {/* Image */}
                <Flex flex={1}>
                    <img src={registerImage} className="auth-image" />
                </Flex>
            </Flex>
        </Card>
    );
};

export default Register;
