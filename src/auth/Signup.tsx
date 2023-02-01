import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import { authStore } from './auth.instances';
import { UserModel } from '@components/user/user.models';
import { AppCenter } from '@components/layout/AppCenter';
import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { PhoneRegExp } from '@library/util/validations';
import { Backdrop } from '@library/Backdrop';
import { VerticalSpace } from '@library/VerticalSpace';

const schema = yup.object().shape({
    firstName: yup.string().nullable().required('First Name is required'),
    lastName: yup.string().nullable().required('Last Name is required'),
    email: yup.string().nullable().email('Please enter valid email'),
    userId: yup.string().nullable().required('Username is required'),
    mobile: yup
        .string()
        .nullable()
        .matches(PhoneRegExp, 'Mobile number is not valid')
        .required('Mobile Number is required'),
    password: yup.string().nullable().required('Password is required'),
    confirmPassword: yup.string().required('Confirm Password is required'),
    // .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const yupSync = {
    async validator({ field }: any, value: any) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};

const _Signup = () => {
    const onFinish = (values: any) => {
        authStore.register(values as UserModel);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <Backdrop>
            <AppCenter>
                <Col>
                    <Row justify={'space-between'}>
                        <Typography.Title
                            level={3}
                            style={{
                                margin: 0,
                            }}
                        >
                            Signup
                        </Typography.Title>
                        <Button type="link" href="/">
                            Already have an account? Log In
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
                        <Row justify={'space-between'}>
                            <Form.Item label="" name="firstName" rules={[yupSync]}>
                                <Input placeholder="First Name" />
                            </Form.Item>
                            <Form.Item label="" name="lastName" rules={[yupSync]}>
                                <Input placeholder="Last Name" />
                            </Form.Item>
                        </Row>
                        <Form.Item label="" name="userId" rules={[yupSync]}>
                            <Input placeholder="Username" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item label="" name="mobile" rules={[yupSync]}>
                            <Input placeholder="Mobile Number" prefix={<MobileOutlined />} />
                        </Form.Item>
                        <Form.Item label="" name="email" rules={[yupSync]}>
                            <Input placeholder="Email" prefix={<MailOutlined />} />
                        </Form.Item>
                        <Form.Item label="" name="password" rules={[yupSync]}>
                            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item label="" name="confirmPassword" rules={[yupSync]}>
                            <Input.Password
                                placeholder="Confirm Password"
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
                                Create Account
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </AppCenter>
        </Backdrop>
    );
};

export const Signup = observer(_Signup);
