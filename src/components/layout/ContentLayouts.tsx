import { FC, ReactNode, useState } from 'react';
import { Affix, Col, Row, theme, Typography } from 'antd';
import { AppLayout } from '../../AppLayout';
import { Styles } from '@library/styles';
import { VerticalSpace } from '@library/VerticalSpace';

export const ContentTitle: FC<{
    title: string;
    centerContent?: ReactNode;
    rightContent?: ReactNode;
    children?: ReactNode;
}> = (props) => {
    const [affixed, setAffixed] = useState<boolean | undefined>(false);
    const { token } = theme.useToken();
    return (
        <Affix offsetTop={0} onChange={(x) => setAffixed(x)}>
            <Row
                style={{
                    ...(affixed
                        ? {
                              borderBottom: Styles.border,
                              background: token.colorBgContainer,
                              padding: '10px 40px',
                              margin: '0 -40px',
                          }
                        : {}),
                }}
            >
                <Col span={6}>
                    <Typography.Title
                        level={4}
                        style={{
                            margin: 0,
                        }}
                    >
                        <strong>{props.title}</strong>
                    </Typography.Title>
                </Col>
                <Col span={10} offset={1}>
                    {props.centerContent}
                </Col>
                <Col span={6} offset={1}>
                    <Row justify={'end'}>{props.rightContent}</Row>
                </Col>
            </Row>
        </Affix>
    );
};

export const ContentFormLayout: FC<{
    title: string;
    children?: ReactNode;
    centerContent?: ReactNode;
    rightContent?: ReactNode;
}> = (props) => {
    return (
        <AppLayout>
            <Col>
                <ContentTitle
                    title={props.title}
                    centerContent={props.centerContent}
                    rightContent={props.rightContent}
                ></ContentTitle>
                <VerticalSpace />
                <Col
                    style={{
                        borderRadius: 5,
                    }}
                >
                    {props.children}
                </Col>
            </Col>
        </AppLayout>
    );
};

export const ContentListLayout: FC<{
    title: string;
    children?: ReactNode;
    headerCenterContent?: ReactNode;
    headerRightContent?: ReactNode;
}> = (props) => {
    const { token } = theme.useToken();
    return (
        <AppLayout>
            <Col>
                <ContentTitle
                    title={props.title}
                    centerContent={props.headerCenterContent}
                    rightContent={props.headerRightContent}
                />
                <VerticalSpace />
                <Col
                    style={{
                        background: token.colorBgContainer,
                        ...Styles.borderBoxShadow,
                        borderRadius: 5,
                    }}
                >
                    {props.children}
                </Col>
            </Col>
        </AppLayout>
    );
};
