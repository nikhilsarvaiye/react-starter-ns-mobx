import { FC, ReactNode } from 'react';
import { Col, theme } from 'antd';
import { Center } from '@library/center';
import { Styles } from '@library/styles';

export const AppCenter: FC<{ children: ReactNode }> = (props) => {
    const { token } = theme.useToken();
    return (
        <Center app>
            <Col
                style={{
                    padding: '2.5%',
                    backgroundColor: token.colorBgContainer,
                    width: '30%',
                    ...Styles.borderBoxShadow,
                }}
            >
                {props.children}
            </Col>
        </Center>
    );
};
