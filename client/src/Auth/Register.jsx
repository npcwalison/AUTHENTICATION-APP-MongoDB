import React from "react";
import { Card, Flex, Form, Input, Typography } from "antd";
import "./styles.css";

const Register = () => {
    const handleRegister = (values) => {
        console.log(values);
    };

    return (
        <Card className="form-conatiner">
            <Flex>
                {/* form */}
                <Flex>
                    <Typography.Title level={3} strong className="title">
                        Create an account
                    </Typography.Title>
                    <Typography.Title
                        type="secondary"
                        strong
                        className="slogan"
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
                                    message: 'please input your name!'
                                }
                            ]}
                        >
                            <Input placeholder="Enter your full name" />
                        </Form.Item>
                    </Form>
                </Flex>

                {/* Image */}
            </Flex>
        </Card>
    );
};

export default Register;
