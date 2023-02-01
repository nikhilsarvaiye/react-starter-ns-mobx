import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';

export const Card = (props: AntdCardProps) => {
    return (
        <AntdCard
            {...props}
            style={{
                borderRadius: 5,
                ...props.style,
            }}
        />
    );
};
