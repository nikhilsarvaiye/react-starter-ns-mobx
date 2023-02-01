import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { BaseForm } from '@components/base/components/BaseForm';
import schema from 'yup/lib/schema';
import { UserAddressFields, UserBasicFields, UserSchema } from './User';
import { userStore } from './user.init';
import { UserModel } from './user.models';

export const CustomerModal = (props: {
    modalOpen: boolean;
    onSave?: (user: UserModel) => void;
    onCancel?: () => void;
}) => {
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(props.modalOpen);

    useEffect(() => {
        setModalOpen(props.modalOpen);
    }, [props.modalOpen]);

    return (
        <BaseForm
            form={form}
            store={userStore as any}
            validationSchema={schema}
            onSave={props.onSave as any}
            onCancel={props.onCancel}
            openAsModal
            modalTitle={'Customer'}
            modalOpen={modalOpen}
        >
            <UserBasicFields schema={UserSchema} />
            <UserAddressFields schema={UserSchema} />
        </BaseForm>
    );
};
