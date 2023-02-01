import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import { authStore } from './auth.instances';
import { UserModel } from '@components/user/user.models';
import { AppCenter } from '@components/layout/AppCenter';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Backdrop } from '@library/Backdrop';
import { VerticalSpace } from '@library/VerticalSpace';

const schema = yup.object().shape({
    userId: yup.string().nullable().required('Username is required'),
    password: yup.string().nullable().required('Password is required'),
});

const yupSync = {
    async validator({ field }: any, value: any) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};

const _UserLogin = () => {
    const onFinish = (values: any) => {
        authStore.logIn(values as UserModel);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <Backdrop>
            <AppCenter>
                <Col className="blur"></Col>
                <Col>
                    <Row justify={'space-between'}>
                        <Typography.Title
                            level={3}
                            style={{
                                margin: 0,
                            }}
                        >
                            Login
                        </Typography.Title>
                        <Button type="link" href="/signup">
                            Don't have an account? Sign up
                        </Button>
                    </Row>
                    <Col
                        style={{
                            height: 30,
                        }}
                    ></Col>
                    <Form
                        form={form}
                        name="login"
                        initialValues={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item label="" name="userId" rules={[yupSync]}>
                            <Input
                                placeholder="Username"
                                prefix={<UserOutlined />}
                                
                            />
                        </Form.Item>

                        <Form.Item label="" name="password" rules={[yupSync]}>
                            <Input.Password
                                placeholder="Password"
                                prefix={<LockOutlined />}
                                
                            />
                        </Form.Item>

                        <VerticalSpace />

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: '100%',
                                }}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </AppCenter>
        </Backdrop>
    );
};

export const UserLogin = observer(_UserLogin);
