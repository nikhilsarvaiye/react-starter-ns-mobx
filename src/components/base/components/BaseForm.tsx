import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, FormInstance, Modal, Space, Spin } from 'antd';
import { observer } from 'mobx-react';
import { ContentFormLayout } from '@components/layout/ContentLayouts';
import { IModel } from '../models';
import { BaseStore } from '../stores';

export interface BaseFormProps {
    validationSchema: any;
    form: FormInstance;
    store: BaseStore<IModel>;
    onFormValueChange?: (changesValues: any, values: any) => void;
    headerCenterContent?: ReactNode;
    headerRightContent?: ReactNode;
    onSave?: (values: IModel) => void;
    onFail?: (errorInfo: any) => void;
    onCancel?: () => void;
    children?: ReactNode;
    openAsModal?: boolean;
    modalTitle?: string;
    modalOpen?: boolean;
}

export const BaseForm: FC<BaseFormProps> = observer((props) => {
    const navigator = useNavigate();
    const [defaultValues, setDefaultValues] = useState<any>(props.store.defaultValues);
    const { id } = useParams();

    const onFinish = (model: IModel) => {
        model.uploadFiles = props.store.selectedItem?.uploadStore?.filesWithMetadata;
        if (id) {
            model.id = id;
            props.store.update(id, model, () => {
                props.store.clearSelectedItem();
            });
        } else {
            props.store.create(model, () => {
                props.store.clearSelectedItem();
            });
        }
        if (!model.id) {
            navigator(`/${props.store.titles.listName.toLocaleLowerCase()}`);
        }
    };

    const onCancel = () => {
        if (props.openAsModal) {
            setModalOpen(false);
        } else {
            navigator(`/${props.store.titles.listName.toLocaleLowerCase()}`);
        }
        if (props.onCancel) {
            props.onCancel();
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        props.store.clearSelectedItem();
        if (id) {
            props.store.get(id);
        }
    }, [id, props.store]);

    const onFormValueChange = (changesValues: any, values: any) => {
        if (props.onFormValueChange) {
            props.onFormValueChange(changesValues, values);
        }
    };

    useEffect(() => {
        if (props.store.selectedItem) {
            setDefaultValues(props.store.selectedItem);
            props.form.setFieldsValue(props.store.selectedItem);
        }
    }, [props.form, props.store.selectedItem]);

    useEffect(() => {
        setModalOpen(props.modalOpen);
    }, [props.modalOpen]);

    const [modalOpen, setModalOpen] = useState(props.modalOpen);

    if (props.openAsModal) {
        return (
            <Modal
                title={props.modalTitle}
                open={modalOpen}
                onOk={() => {
                    props.form.submit();
                }}
                onCancel={() => {
                    setModalOpen(false);
                    if (onCancel) {
                        onCancel();
                    }
                }}
                okText={id ? 'Update' : 'Add'}
                width={'60%'}
            >
                <Form
                    form={props.form}
                    name="login"
                    initialValues={defaultValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    onValuesChange={onFormValueChange}
                >
                    {props.children}
                </Form>
            </Modal>
        );
    }

    return (
        <ContentFormLayout
            title={`${id ? 'Edit' : 'New'} ${props.store.titles.name}`}
            centerContent={props.headerCenterContent}
            rightContent={
                props.headerRightContent || (
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                props.form.submit();
                            }}
                        >
                            Save
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </Space>
                )
            }
        >
            <Spin spinning={props.store.loading}>
                <Col>
                    <Form
                        form={props.form}
                        name="login"
                        initialValues={defaultValues}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        onValuesChange={onFormValueChange}
                    >
                        {props.children}
                    </Form>
                </Col>
            </Spin>
        </ContentFormLayout>
    );
});
