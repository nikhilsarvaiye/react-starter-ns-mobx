import { FC, ReactNode } from 'react';
import { Col } from 'antd';

export const Backdrop: FC<{ children: ReactNode }> = (props) => {
    return (
        <Col>
            <Col
                style={{
                    background: '#f9fafb',
                    height: '100vh',
                    zIndex: -1,
                    position: 'absolute',
                    opacity: 0.5,
                    width: '100%',
                    filter: 'blur(18px)',
                }}
            />
            {props.children}
        </Col>
    );
};
