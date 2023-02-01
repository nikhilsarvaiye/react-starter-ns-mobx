import { Row } from 'antd';

export const Center = ({
    app,
    height,
    children,
}: {
    app?: boolean;
    height?: string;
    children: any;
}) => {
    return (
        <Row
            justify="center"
            align="middle"
            style={{
                height: height || `90${app ? 'vh' : '%'}`,
            }}
        >
            {children}
        </Row>
    );
};
