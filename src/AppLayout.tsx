import { createElement, FC, ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, ConfigProvider, Input, Layout, Menu, Row, theme } from 'antd';
import {
    AccountBookOutlined,
    AreaChartOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    ShoppingOutlined,
    SlidersOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { authService } from '@auth';

const { Header, Sider, Content } = Layout;

export const AppLayout: FC<{ children: ReactNode }> = (props) => {
    const { token } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const menuItems = [
        {
            key: '1',
            icon: <SlidersOutlined />,
            label: 'Dashboard',
            children: [
                {
                    key: '11',
                    icon: <AreaChartOutlined />,
                    label: 'Sales Monitoring',
                },
                {
                    key: '12',
                    icon: <AreaChartOutlined />,
                    label: 'Website Analytics',
                },
                {
                    key: '13',
                    icon: <AreaChartOutlined />,
                    label: 'Customer Insights',
                },
                {
                    key: '14',
                    icon: <AreaChartOutlined />,
                    label: 'Promotion Overview',
                },
            ],
        },
    ];

    return (
        <ConfigProvider>
            <Layout
                hasSider
                style={
                    {
                        //maxHeight: '100vh',
                        //overflow: 'hidden',
                    }
                }
            >
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                colorItemBg: token.colorPrimaryHover,
                                colorItemBgSelected: token.colorPrimaryActive,
                                colorItemText: token.colorBgContainer,
                                colorItemTextSelected: token.colorBgContainer,
                                colorItemTextHover: token.colorBgContainer,
                                controlHeightLG: 40,
                                fontSize: 13.5,
                                itemMarginInline: 0,
                            },
                        },
                    }}
                >
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        width={'15%'}
                        style={{
                            backgroundColor: token.colorPrimary,
                            borderRight: '1px solid rgb(240, 240, 240)',
                            // fix sider
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <div
                            className="logo"
                            style={{
                                height: 64,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                alt="Logo"
                                style={{
                                    width: '60%',
                                    height: '80%',
                                }}
                                src="/logo/logo_name_transparent.png"
                            />
                        </div>

                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[]}
                            style={{
                                border: 'none',
                            }}
                        >
                            <NavLink to="/products">
                                <Menu.Item key={'products'} icon={<ShoppingOutlined />}>Products</Menu.Item>
                            </NavLink>
                            <NavLink to="/users">
                                <Menu.Item key={'users'} icon={<UserOutlined />}>Users</Menu.Item>
                            </NavLink>
                        </Menu>
                    </Sider>
                </ConfigProvider>
                <Layout
                    style={{
                        overflow: 'scroll',
                        marginLeft: collapsed ? '5%' : '15%',
                    }}
                >
                    <Header
                        style={{
                            padding: 0,
                            backgroundColor: token.colorBgContainer,
                            borderBottom: '1px solid rgb(240, 240, 240)',
                            // position: 'sticky',
                            // top: 0,
                            // zIndex: 1,
                            // width: '100%',
                        }}
                    >
                        <Row>
                            <Col span={8}>
                                {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                    onMouseEnter: () => {
                                        setIsHover(true);
                                    },
                                    onMouseLeave: () => {
                                        setIsHover(false);
                                    },
                                    style: {
                                        padding: '0 24px',
                                        fontSize: '18px',
                                        lineHeight: '64px',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s',
                                        ...(isHover
                                            ? {
                                                  color: token.colorPrimary,
                                              }
                                            : {}),
                                    },
                                })}
                            </Col>
                            <Col span={8}>
                                <Input
                                    size="middle"
                                    placeholder="Search"
                                    prefix={<SearchOutlined />}
                                />
                            </Col>
                            <Col span={8} dir="rtl">
                                <Menu
                                    mode="horizontal"
                                    defaultSelectedKeys={['1']}
                                    direction="ltr"
                                    style={{
                                        border: 'none',
                                    }}
                                    items={[
                                        {
                                            key: '1',
                                            icon: <UserOutlined />,
                                            label: 'Nikhil Sarvaiye',
                                            children: [
                                                {
                                                    key: '11',
                                                    icon: <AccountBookOutlined />,
                                                    label: 'Account',
                                                },
                                                {
                                                    key: '12',
                                                    icon: <LogoutOutlined />,
                                                    label: 'Logout',
                                                    onClick: () => {
                                                        authService.logout();
                                                    }
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            padding: '2% 3%',
                            minHeight: '44vw',
                        }}
                    >
                        {props.children}
                    </Content>
                    {/* <Footer style={{
                            background: token.colorBgContainer
                        }}>
                        <Row justify={'end'} >
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        // form.submit();
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={() => {
                                        // navigator('/products');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Space>
                        </Row>
                    </Footer> */}
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
