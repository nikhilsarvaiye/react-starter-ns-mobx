import { observer } from 'mobx-react-lite';
import { Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import * as yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import { BaseForm } from '@components/base/components/BaseForm';
import { EnvironmentOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { PhoneRegExp, yupSync } from '@library/util/validations';
import { userStore } from './user.init';

const schema = yup.object().shape({
    firstName: yup.string().nullable().required('First Name is required'),
    lastName: yup.string().nullable().required('Last Name is required'),
    mobile: yup
        .string()
        .nullable()
        .matches(PhoneRegExp, 'Mobile number is not valid')
        .required('Mobile Number is required'),
    email: yup.string().nullable().email('Please enter valid email'),
    userId: yup.string().nullable().required('Username is required'),
    address: yup.string().nullable(),
    area: yup.string().nullable(),
    landmark: yup.string().nullable(),
    city: yup.string().nullable(),
    pincode: yup.string().nullable(),
    gender: yup.string().nullable(),
    dob: yup.string().nullable(),
    type: yup.string().nullable(),
});

const _User = () => {
    const [form] = Form.useForm();

    const onFormValueChange = (changesValues: any, values: any) => {
        console.log('user onFormValueChange', values);
    };

    return (
        <BaseForm
            form={form}
            store={userStore as any}
            validationSchema={schema}
            onFormValueChange={onFormValueChange}
        >
            <Row>
                {/* <Col span={2}>
                    {userStore.selectedItem.uploadStore ? (
                        <Upload store={userStore.selectedItem.uploadStore} />
                    ) : (
                        <Center>
                            <Spin spinning={true} size={'small'} />
                        </Center>
                    )}
                </Col> */}
                <Col span={16}>
                    <UserInformation schema={schema} />
                </Col>
                <Col span={7} offset={1}>
                    <UserAddress schema={schema} />
                </Col>
            </Row>
        </BaseForm>
    );
};

export const UserInformation = ({ schema }: { schema: any }) => {
    return (
        <Card title="Basic">
            <Row>
                <Col span={24}>
                    <UserBasicFields schema={schema} />
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Gender" name="gender" rules={[yupSync(schema)]}>
                                <Select
                                    placeholder="Gender"
                                    defaultValue={2}
                                    options={[
                                        {
                                            label: 'Unknown',
                                            value: -1,
                                        },
                                        {
                                            label: 'Male',
                                            value: 1,
                                        },
                                        {
                                            label: 'Female',
                                            value: 2,
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11} offset={2}>
                            <Form.Item label="Date of Birth" name="dob" rules={[yupSync(schema)]}>
                                <DatePicker placeholder="Date of Birth" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Form.Item valuePropName="checked" name="type" rules={[yupSync(schema)]}>
                        <Checkbox>This user is a System User</Checkbox>
                    </Form.Item> */}
                </Col>
            </Row>
        </Card>
    );
};

export const UserBasicFields = ({ schema }: { schema: any }) => {
    return (
        <>
            <Row>
                <Col span={11}>
                    <Form.Item label="Firstname" name="firstName" rules={[yupSync(schema)]}>
                        <Input placeholder="First Name" />
                    </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                    <Form.Item label="Lastname" name="lastName" rules={[yupSync(schema)]}>
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <Form.Item label="Mobile Number" name="mobile" rules={[yupSync(schema)]}>
                        <Input placeholder="Mobile Number" prefix={<MobileOutlined />} />
                    </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                    <Form.Item label="Email" name="email" rules={[yupSync(schema)]}>
                        <Input placeholder="Email" prefix={<MailOutlined />} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const UserAddress = ({ schema }: { schema: any }) => {
    return (
        <Card title="Address">
            <Row>
                <Col span={24}>
                    <UserAddressFields schema={schema} />
                </Col>
            </Row>
        </Card>
    );
};

export const UserAddressFields = ({ schema }: { schema: any }) => {
    return (
        <>
            <Form.Item label="Address" name="address" rules={[yupSync(schema)]}>
                <Input.TextArea placeholder="Address" />
            </Form.Item>
            <Row>
                <Col span={11}>
                    <Form.Item label="Locality / Area" name="area" rules={[yupSync(schema)]}>
                        <Input placeholder="Locality / Area" />
                    </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                    <Form.Item label="Landmark" name="landmark" rules={[yupSync(schema)]}>
                        <Input placeholder="Landmark" prefix={<EnvironmentOutlined />} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <Form.Item label="Pin Code" name="pincode" rules={[yupSync(schema)]}>
                        <Input placeholder="Pin Code" />
                    </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                    <Form.Item label="City" name="city" rules={[yupSync(schema)]}>
                        <Input placeholder="City" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const User = observer(_User);

export { schema as UserSchema };
