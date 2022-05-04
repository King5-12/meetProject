import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Tabs } from 'antd';
import { history } from 'umi';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import socket from '@/utils/socket';
import { loginTokenStorage } from '@/utils/storage';
import { LOGIN, REGISTER } from '@/constants';

import styles from './styles.less';

interface FormValue {
    username: string;
    password: string;
}
export default function Login() {
    const [activeKey, setActiveKey] = useState('1');
    const [loading, setLoading] = useState(false);
    const [loginForm] = Form.useForm();
    const [registerForm] = Form.useForm();

    const handleLogin = (value: FormValue) => {
        setLoading(true);
        const { username, password } = value;
        socket.emit(LOGIN, { username, password });
    };
    const handleRegister = (value: FormValue) => {
        setLoading(true);
        const { username, password } = value;
        socket.emit(REGISTER, { username, password });
    };

    useEffect(() => {
        socket.on(LOGIN, res => {
            // 如果登录成功
            if (res.code === 200) {
                message.success(res.msg, 1);
                loginTokenStorage.set(res.data.username);
                history.push('/meetProject/chatroom');
                // ipcRenderer.send("chat-page")
            } else {
                message.error(res.msg, 1);
                setLoading(false);
            }
        });

        // 监听服务端处理注册的结果
        socket.on(REGISTER, res => {
            if (res.code === Error) {
                message.error(res.msg, 1);
            } else {
                message.success(res.msg, 1);
                setActiveKey('1');
                setLoading(false);
            }
        });
    }, []);

    return (
        <div className={styles['chat-room-login-container']}>
            <Tabs
                type="card"
                activeKey={activeKey}
                onTabClick={key => {
                    setActiveKey(key);
                    if (key === '1') {
                        registerForm.resetFields();
                    } else {
                        loginForm.resetFields();
                    }
                }}
                animated
                centered
            >
                <Tabs.TabPane tab="登录" key={'1'}>
                    <Form name="login" onFinish={handleLogin} form={loginForm}>
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入用户名!' },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined
                                        className={
                                            styles['chat-room-login-icon']
                                        }
                                    />
                                }
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined
                                        className={
                                            styles['chat-room-login-icon']
                                        }
                                    />
                                }
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                loading={loading}
                                type="primary"
                                block
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="注册" key={'2'}>
                    <Form
                        name="register"
                        onFinish={handleRegister}
                        form={registerForm}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入用户名!' },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined
                                        className={
                                            styles['chat-room-login-icon']
                                        }
                                    />
                                }
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined
                                        className={
                                            styles['chat-room-login-icon']
                                        }
                                    />
                                }
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                loading={loading}
                                type="primary"
                                block
                            >
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}
