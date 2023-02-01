import { useState, useEffect } from 'react';
import { Avatar, Select, Space, Spin, theme } from 'antd';
import debounce from 'lodash/debounce';
import { UserOutlined } from '@ant-design/icons';
import { UserModel } from './user.models';
import { userService } from './user.init';

export interface UserPickerProps {
    onChange?: (userId: string, user?: UserModel) => void;
    value?: string;
}

export const UserPicker = (props: UserPickerProps) => {
    const { token } = theme.useToken();
    const [users, setUsers] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = async (key?: string) => {
        try {
            setLoading(true);
            let users = await userService.list({
                filter: {
                    or: [
                        key
                            ? {
                                  name: {
                                      startswith: key,
                                  },
                              }
                            : {},
                        key
                            ? {
                                  name: {
                                      contains: key,
                                  },
                              }
                            : {},
                        key
                            ? {
                                  contact1: {
                                      contains: key,
                                  },
                              }
                            : {},
                        key
                            ? {
                                  contact1: {
                                      contains: key,
                                  },
                              }
                            : {},
                        props.value
                            ? {
                                  id: {
                                      eq: props.value,
                                  },
                              }
                            : {},
                    ],
                },
                // TODO:
                // select: ['id', 'name', 'contact1'],
                top: 20,
            });
            setUsers(users);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, [props.value]);

    const { Option } = Select;

    return (
        <Select
            {...(props as any)}
            onChange={(id: string) => {
                const user = (users || []).find((x) => x.id === id);
                if (props.onChange) {
                    props.onChange(id, user);
                }
            }}
            showSearch
            allowClear
            autoClearSearchValue
            loading={loading}
            onSearch={debounce((value: string) => {
                getUsers(value);
            }, 300)}
            suffixIcon={<UserOutlined />}
            notFoundContent={loading ? <Spin spinning={loading}></Spin> : null}
            style={{
                width: '100%',
            }}
        >
            {users.map((x) => {
                return (
                    <Option value={x.id} title={`${x.name}${x.mobile}`} key={x.id}>
                        <Space>
                            <Avatar
                                size="small"
                                style={{
                                    marginTop: -2,
                                }}
                                src={x.pictureUrl}
                            />
                            <Space>
                                <div className="name">{x.name}</div>
                                <div className="contact">{x.mobile}</div>
                            </Space>
                        </Space>
                    </Option>
                );
            })}
        </Select>
    );
};
