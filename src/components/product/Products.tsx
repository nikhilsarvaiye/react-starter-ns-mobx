import { Button, Col, Form, Input, Row, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BaseList } from '@components/base/components/BaseList';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { productStore } from './InitProducts';

export const Products = () => {
    const navigator = useNavigate();
    const columns = [
        {
            dataIndex: 'name',
            title: 'Product Name',
            render: (value: any, record: any, index: number) => {
                return (
                    <Button
                        type="link"
                        onClick={() => {
                            navigator(
                                `/${productStore.titles.listName.toLocaleLowerCase()}/${record.id}`,
                            );
                        }}
                    >
                        {value}
                    </Button>
                );
            },
        },
        {
            dataIndex: 'category',
            title: 'Category',
            sorter: true,
        },
        {
            dataIndex: 'quantity',
            title: 'Stock',
        },
        {
            dataIndex: 'price',
            title: 'Price',
        },
        {
            dataIndex: 'status',
            title: 'Status',
            render: (value: any, record: any, index: number) => {
                return <Tag color="green">{value}</Tag>;
            },
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
                        <Form.Item name={'category'}>
                            <Input placeholder="Search by category" />
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item name={'status'}>
                            <Input placeholder="Search by status" />
                        </Form.Item>
                    </Col>
                </Row>
            }
            columns={columns}
            store={productStore as any}
        />
    );
};
