import { StrictMode } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, Spin } from 'antd';
import { observer } from 'mobx-react';
import { authStore } from '@auth';
import { Center } from '@library/center';
import { UserContext } from '@components/user/user.init';
import { AppUnauthorizedRoutes } from './AppUnauthorizedRoutes';
import { AppAuthorizedRoutes } from './AppAuthorizedRoutes';
import { ReactUserContext } from '@components/user/user.context';
import { DefaultAppTheme } from './AppTheme';
import { AppContext, ReactAppContext } from './App.context';
import './App.css';

Spin.setDefaultIndicator(<LoadingOutlined style={{
    fontSize: 30,
}}/>);

const App = () => {
    return (
        <div className="app">
            <ConfigProvider theme={DefaultAppTheme}>
                <StrictMode>
                    {authStore.loading ? (
                        <Center app>
                            <Spin spinning={authStore.loading}></Spin>
                        </Center>
                    ) : UserContext.LoggedInUser ? (
                        <ReactAppContext.Provider value={AppContext}>
                            <ReactUserContext.Provider value={UserContext}>
                                <AppAuthorizedRoutes />
                            </ReactUserContext.Provider>
                        </ReactAppContext.Provider>
                    ) : (
                        <AppUnauthorizedRoutes />
                    )}
                </StrictMode>
            </ConfigProvider>
        </div>
    );
};

export default observer(App);
