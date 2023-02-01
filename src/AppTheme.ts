import { Styles } from '@library/styles';
import { ThemeConfig } from 'antd/es/config-provider/context';

let colorPrimary = 'rgb(24, 144, 255)';
let colorPrimaryActive = 'rgb(10 130 242)';
let colorPrimaryHover = 'rgb(76 166 249)';
// blue
colorPrimary = '#2F65CB';
colorPrimaryActive = 'rgb(214 128 31)'; // '#dd164e'; // '#275cbe';
colorPrimaryHover = '#376FD0';

export const DefaultAppTheme: ThemeConfig = {
    token: {
        wireframe: true,
        borderRadius: 5,
        colorBgLayout: '#f9fafb', // '#F7F9FC',
        colorBgContainer: '#fff',
        colorPrimary: colorPrimary,
        colorPrimaryActive: colorPrimaryActive,
        colorPrimaryTextActive: colorPrimaryActive,
        colorPrimaryHover: colorPrimaryHover,
    },
    components: {
        Input: {
            controlHeight: 36,
        },
        Select: {
            controlHeight: 36,
        },
        InputNumber: {
            controlHeight: 36,
        },
        Button: {
            borderRadius: 5,
            controlHeight: 34,
        },
        Card: {
            colorBorder: Styles.borderColor,
            borderRadius: 50,
        },
        Menu: {
        },
        Typography: {
            colorTextDisabled: 'gray',
        }
    },
};
