import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Form, Input, Row, Spin } from 'antd';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { VerticalSpace } from '@library/VerticalSpace';
import { Card } from '@library/Card';
import { Upload } from '@library/upload';
import { productStore } from '@components/product/InitProducts';
import { Center } from '@library/center';
import { yupSync } from '@library/util/validations';
import { BaseForm } from '@components/base/components/BaseForm';

const schema = yup.object().shape({
    name: yup.string().nullable().required('Please provide Product title'),
});

const _Product = () => {
    const [form] = Form.useForm();

    const onFormValueChange = (changesValues: any, values: any) => {
        console.log('onFormValueChange', values);
    };

    return (
        <BaseForm
            form={form}
            store={productStore as any}
            validationSchema={schema}
            onFormValueChange={onFormValueChange}
        >
            <Row>
                {/* Left */}
                <Col span={16}>
                    <ProductGeneral />
                    <VerticalSpace size="lg" />
                    <ProductGeneral />
                </Col>

                {/* Right */}
                <Col span={7} offset={1}>
                    <ProductMedia />
                    <VerticalSpace size="lg" />
                    <Card title="Search Engine Listing"></Card>
                </Col>
            </Row>
        </BaseForm>
    );
};

const ProductGeneral = () => {
    const [value, setValue] = useState('');
    return (
        <Card title="">
            <Form.Item label="Title" name="name" rules={[yupSync(schema)]}>
                <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[yupSync(schema)]}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    formats={[
                        'header',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'list',
                        'bullet',
                        'indent',
                        'link',
                        'image',
                    ]}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [
                                { list: 'ordered' },
                                { list: 'bullet' },
                                { indent: '-1' },
                                { indent: '+1' },
                            ],
                            ['link', 'image'],
                            ['clean'],
                        ],
                    }}
                    style={{
                        height: 150,
                        marginBottom: 40,
                    }}
                />
            </Form.Item>
        </Card>
    );
};

const ProductMedia = observer(() => {
    return (
        <Card title="Media">
            {productStore.selectedItem.uploadStore ? (
                <Upload store={productStore.selectedItem.uploadStore} multiple />
            ) : (
                <Center>
                    <Spin spinning={true} size={'small'} />
                </Center>
            )}
        </Card>
    );
});

export const Product = observer(_Product);
