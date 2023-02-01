import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { BaseList } from '@components/base/components/BaseList';
import { userStore } from './user.init';

const _Users = () => {
    const navigator = useNavigate();
    const columns = [
        {
            dataIndex: 'name',
            title: 'Customer Name',
            render: (value: any, record: any, index: number) => {
                return (
                    <Button
                        type="link"
                        onClick={() => {
                            navigator(
                                `/${userStore.titles.listName.toLocaleLowerCase()}/${record.id}`,
                            );
                        }}
                    >
                        {value}
                    </Button>
                );
            },
        },
        {
            dataIndex: 'mobile',
            title: 'Mobile Number',
            sorter: true,
        },
        {
            dataIndex: 'email',
            title: 'Email',
        },
        {
            dataIndex: 'city',
            title: 'Aurangabad',
        },
    ] as (ColumnGroupType<any> | ColumnType<any>)[];
    return (
        <BaseList
            searchFormFields={
                <Row>
                    <Col span={6}>
                        <Form.Item name={'name'}>
                            <Input placeholder="Search by name" />
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item name={'name'}>
                            <Input
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Search by name"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item name={'status'}>
                            <Input placeholder="Search by Status" allowClear />
                        </Form.Item>
                    </Col>
                </Row>
            }
            columns={columns}
            store={userStore as any}
        />
    );
};

export const Users = observer(_Users);
